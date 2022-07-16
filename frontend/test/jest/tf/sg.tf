resource "compute_volume" "volume_srv1" {
  name="volume_srv1"
}

resource "compute_volume" "volume_srv2" {
  name="volume_srv2"
}

resource "compute_instance" "srv_www1" {
  name="srv_www1"
  security_groups=[compute_security_group.sg_www]
}

resource "compute_volume_attachement" "volume_att_srv1" {
  name="volume_att_srv1"
  server_id=compute_instance.srv_www1
  volume_id=compute_volume.volume_srv1
}

resource "compute_security_group" "sg_www" {
  name="sg_www"
}

resource "compute_instance" "srv_www2" {
  name="srv_www2"
  security_groups=[compute_security_group.sg_www]
}

resource "compute_volume_attachement" "volume_att_srv2" {
  name="compute_volume_attachement"
  server_id=compute_instance.srv_www2
  volume_id=compute_volume.volume_srv2
}

resource "postgre_database" "db" {
  name="postgre_database"
  cluster_id=postgre_cluster.postgre_cluster
  cluster_id = postgre_cluster.postgre_cluster
}

resource "postgre_cluster" "postgre_cluster" {
  name="postgre_cluster"
}

resource "trafficmanager_service" "trafficmanager_service" {
  name ="trafficmanager_service"
  healthcheck_refs = [trafficmanager_healthcheck.trafficmanager_healthcheck]
}

resource "trafficmanager_healthcheck" "trafficmanager_healthcheck" {
  name ="trafficmanager_healthcheck"
}

provider "cloudplatform" {
  region="eu-west-3"
}
