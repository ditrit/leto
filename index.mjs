import { letoModel } from "./TextualPart/letoModel.js"

console.log('TEST :\n')

let leto = new letoModel()

leto.parse(`
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
      host1 : server
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
    host1 : myDBServer
  }
};

nodeTemplate myTomcat type tomcat {
  requirements {
    host1 : myAppliServer,
    dataSource : myDBServer 
  }
};
`)

console.log('\nTEST MODIFICATION :\n')

leto.parse(`
nodeType server {
    properties {
      num_cpus_test : integer,
      os : string
    }
    capabilities {
      container : host
    }
};
   
nodeType softwareComponent {
    requirements {
      host1 : server
    }
};

nodeType tomcat derived_from server {
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
    num_cpus : 3,
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
    host1 : myDBServer
  }
};

nodeTemplate myTomcat type tomcat {
  requirements {
    host1 : myAppliServer,
    dataSource : myDBServer 
  }
};
 
`) 

console.log(leto.toString())




