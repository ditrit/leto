
resource "aws_db_subnet_group" "rds_subnet" {
    name = "rds_subnet_grpp"
    subnet_ids = ["${aws_subnet.webservers-a.id}","${aws_subnet.webservers-b.id}"]
}

resource "aws_db_instance" "myawsdb" {
  allocated_storage    = 20
  engine               = "mariadb"
  engine_version       = "10.1.26"
  instance_class       = "db.t2.micro"
  name                 = "myawsdb"
  username             = "user"
  password             = "password"
  db_subnet_group_name = "${aws_db_subnet_group.rds_subnet.id}"
  skip_final_snapshot = false
  multi_az = true
  final_snapshot_identifier = "myawsdbfinalsnap"
  vpc_security_group_ids = ["${aws_security_group.sg_rds.id}"]
}

resource "aws_security_group" "sg_rds" {
  name = "sg_rds"
  vpc_id = "${aws_vpc.vpc_main.id}"

  ingress {
    from_port = "${var.mariadb_port}"
    to_port   = "${var.mariadb_port}"
    protocol  = "tcp"
    cidr_blocks = ["172.16.0.0/16"]
  }

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_zone" "publicdns" {
  name         = "aws.domaine.fr"
}

resource "aws_route53_record" "www-a" {
  zone_id = "${aws_route53_zone.publicdns.zone_id}"
  name    = "www-a.aws.domaine.fr"
  type    = "A"
  ttl = "60"
  records = ["${aws_instance.www-a.public_ip}"]
}

resource "aws_route53_record" "www-b" {
  zone_id = "${aws_route53_zone.publicdns.zone_id}"
  name    = "www-b.aws.morot.fr"
  type    = "A"
  ttl = "60"
  records = ["${aws_instance.www-b.public_ip}"]
}

resource "aws_route53_record" "www" {
  zone_id = "${aws_route53_zone.publicdns.zone_id}"
  name = "www.aws.domaine.fr"
  type = "CNAME"
  ttl = "60"
  records = ["${aws_elb.http-lb.dns_name}"]
}

resource "aws_elb" "http-lb" {
  name = "http-lb"
  subnets = ["${aws_subnet.webservers-a.id}","${aws_subnet.webservers-b.id}"]
  security_groups = ["${aws_security_group.sg_elb.id}"]
  instances       = ["${aws_instance.www-a.id}", "${aws_instance.www-b.id}"]

  listener {
    lb_port = "${var.http_port}"
    lb_protocol = "http"
    instance_port = "${var.http_port}"
    instance_protocol = "http"
  }

  health_check {
    healthy_threshold = 2
    unhealthy_threshold = 2
    timeout = 3
    interval = 5
    target = "TCP:${var.http_port}"
  }
}

resource "aws_security_group" "sg_elb" {
  name = "sg_elb"
  vpc_id = "${aws_vpc.vpc_main.id}"

  ingress {
    from_port = "${var.http_port}"
    to_port   = "${var.http_port}"
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "icmp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }
}

provider "aws" {
  access_key = "ABCD1234J54PXLDF4IC4WMVA"
  secret_key = "28prpojfngldfgPcgiv79Q/J+8o7ksdfsTjmmE2QQBRa"
  region     = "eu-west-3"
}

resource "aws_instance" "www-a" {
  ami = "ami-8ee056f3"
  instance_type = "t2.micro"
  key_name = "aws-ssh-key"
  vpc_security_group_ids = ["${aws_security_group.sg_www.id}"]
  user_data = <<EOF
#!/bin/bash
yum -y update
yum -y install httpd
chkconfig httpd on
service httpd start
EOF
  subnet_id              = "${aws_subnet.webservers-a.id}"
  associate_public_ip_address = "true"
}

resource "aws_instance" "www-b" {
  ami = "ami-8ee056f3"
  instance_type = "t2.micro"
  key_name = "aws-ssh-key"
  vpc_security_group_ids = ["${aws_security_group.sg_www.id}"]aws_internet_gatewayaws_internet_gateway
  user_data = <<EOF
#!/bin/bash
yum -y update
yum -y install httpd
chkconfig httpd on
service httpd start
EOF
  subnet_id              = "${aws_subnet.webservers-b.id}"
  associate_public_ip_address = "true"
}

resource "aws_security_group" "sg_www" {
  name = "sg_www"
  vpc_id = "${aws_vpc.vpc_main.id}"

  ingress {
    from_port = "${var.http_port}"
    to_port   = "${var.http_port}"
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = "${var.ssh_port}"
    to_port   = "${var.ssh_port}"
    protocol  = "tcp"
    cidr_blocks = ["1.2.3.4/32"]
  }

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "icmp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_subnet" "webservers-a" {
  vpc_id                  = "${aws_vpc.vpc_main.id}"
  cidr_block              = "172.16.10.0/24"
  map_public_ip_on_launch = true
  availability_zone = "eu-west-3a"
}

resource "aws_subnet" "webservers-b" {
  vpc_id                  = "${aws_vpc.vpc_main.id}"
  cidr_block              = "172.16.20.0/24"
  map_public_ip_on_launch = true
  availability_zone = "eu-west-3b"
}

resource "aws_vpc" "vpc_main" {
  cidr_block = "172.16.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true
}

resource "aws_internet_gateway" "default" {
  vpc_id = "${aws_vpc.vpc_main.id}"
}

resource "aws_route" "wan_access" {
  route_table_id          = "${aws_vpc.vpc_main.main_route_table_id}"
  destination_cidr_block  = "0.0.0.0/0"
  gateway_id              = "${aws_internet_gateway.default.id}"
}

variable "http_port" {
  description = "Port pour les requêtes HTTP"
  default = 80
}

variable "ssh_port" {
  description = "Port pour les requêtes SSH"
  default = 22
}

variable "mariadb_port" {
  description = "Port pour les connexions MariaDB"
  default = 3306
}

variable "vpc_cidr_block" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}
