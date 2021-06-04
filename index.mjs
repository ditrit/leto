import { letoModel } from "./TextualPart/letoModel.js"

console.log('TEST :\n')

let leto = new letoModel()

leto.parse(input)

console.log(leto.toString())


/*leto.parse(`
nodeType server {
  properties {
    num_cpus : integer,
    os : string
  }
  capabilities {
    container : host
  }
};
nodeType softwareComponent {
  requirements {
    host : server
  }

  capabilities {
    container : host
  }
};
 

nodeType tomcat derived_from softwareComponent {
  requirements {
    dataSource : BD
  }
};

nodeType BD derived_from softwareComponent {
  capabilities {
    dataSource : connectsTo     
  }
};

nodeTemplate myAppliServer type server {
  properties {
    num_cpus : 2,
    os : "linux"
  }
};

nodeTemplate myDBServer type server {
  properties {
    num_cpus : 4,
    os : "linux"
  }
};

nodeTemplate myDB type BD {
  requirements {
    host : myDBServer
  }
};

nodeTemplate myTomcat type tomcat {
  requirements {
    host : myAppliServer,
    dataSource : myDBServer 
  }
};
`)

console.log('\nTEST MODIFICATION :\n')

leto.parse(`
nodeType server2 {
  properties {
    num_cpus : integer,
    os : string
  }
  capabilities {
    container : host
  }
  requirements {
    host : server
  }
};
 
nodeType softwareComponent {
  requirements {
    host : server
  }
};
 
nodeType tomcat derived_from server2 {
  requirements {
    dataSource : BD
  }
};

nodeType BD derived_from softwareComponent {
  capabilities {
    dataSource : connectsTo     
  }
};

nodeTemplate myAppliServer type server2 {
  properties {
    num_cpus : 3,
    os : "linux"
  }
};

nodeTemplate myDBServer type server2 {
  properties {
    num_cpus : 4,
    os : "linux"
  }
};

nodeTemplate myDB type BD {
  requirements {
    host : myDBServer
  }
};

nodeTemplate myTomcat type tomcat {
  requirements {
    host : myAppliServer,
    dataSource : myDBServer 
  }
  properties {
    host : server
  }
};
`)*/






