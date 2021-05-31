import { letoModel } from '../letoModel.js'

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
nodeType server {
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
`)

console.log('\n')

describe("Leto TextualPart -> ", function() {

    describe("test nodeType id : ", function() {
        it("tomcat", 
            function () {expect(leto.prog.nodeTypes['tomcat'].id).toEqual("tomcat")})
    })
    describe("test nodeType parent : ", function() {
        it("tomcat", 
            function () {expect(leto.prog.nodeTypes['tomcat'].parentName.name).toEqual("server")})
    })
    describe("test nodeType capabilities : ", function() {
        it("tomcat", 
            function () {expect(leto.prog.nodeTypes['tomcat'].capabilities).toEqual(null)})
    })
    describe("test nodeType properties : ", function() {
        it("tomcat", 
            function () {expect(leto.prog.nodeTypes['tomcat'].properties).toEqual(null)})
    })
    describe("test nodeType requirements : ", function() {
        it("tomcat", 
            function () {expect(leto.prog.nodeTypes['tomcat'].requirements['dataSource'].name).toEqual('dataSource')})
    })
    describe("test nodeType version : ", function() {
        it("tomcat", 
            function () {expect(leto.prog.nodeTypes['tomcat'].version).toEqual(2)})
    })
})

describe("Leto TextualPart -> ", function() {

    describe("test nodeTemplate id : ", function() {
        it("myTomcat", 
            function () {expect(leto.prog.nodeTemplates['myTomcat'].id).toEqual("myTomcat")})
    })
    describe("test nodeTemplate parent : ", function() {
        it("tomcat", 
            function () {expect(leto.prog.nodeTemplates['myTomcat'].parentName.name).toEqual("tomcat")})
    })
    describe("test nodetemplate properties : ", function() {
        it("tomcat", 
            function () {expect(leto.prog.nodeTemplates['myTomcat'].properties['host'].typeName).toEqual('server')})
    })
    describe("test nodetemplate requirements : ", function() {
        it("tomcat", 
            function () {expect(leto.prog.nodeTemplates['myTomcat'].requirements['dataSource'].nodeName).toEqual('myDBServer')})
    })
    describe("test nodetemplate version : ", function() {
        it("tomcat", 
            function () {expect(leto.prog.nodeTemplates['myTomcat'].version).toEqual(2)})
    })
})