import { isArray } from 'mathjs';

function arrangeResources(containers, orderResources, index, resource) {
  if (isArray(orderResources[index])) {
    orderResources[index].forEach((type) => {
      if (resource.type == type) {
        resource.order = index;
        containers.push(resource);
      }
    });
  } else if (resource.type == orderResources[index]) {
    resource.order = index;
    containers.push(resource);
  }

  return containers;
}

function getContainer(resources, orderResources) {
  let containers = [];
  resources.forEach((r) => {
		r.id = r.name + "_" + r.type;
    if (r.representation == 'container') {
      r.contains = [];
      r.link = [];
      r.containers = [];
      for (let i = 0; i < orderResources.length; i++) {        
        containers = arrangeResources(containers, orderResources, i, r);
      }
      if (!containers.includes(r)) { containers.push(r); }
    }
  });

  return containers;
}

function getModules(modules, containers, orderResources) {
  modules.forEach((m) => {
    if (m.representation == 'container') {
      m.contains = [];
      m.containers = [];
      for (let i = 0; i < orderResources.length; i++) {
        m.resources.forEach((resource) => {
          m.contains = arrangeResources(m.contains, orderResources, i, resource);
        });
      }
      m.resources.forEach((resource) => {
        if (!m.contains.includes(resource) && resource.representation == 'contained') {
          m.contains.push(resource);
        }
      });
      containers.push(m);
    }
  });

  return containers;
}

function getRelationsContainers(resources, containers) {
  resources.forEach((r) => {
    if (r.representation != 'container') {
      r.resourcesObject.forEach((ro) => {
        const multiple = (ro.array === undefined) ? false : ro.array;
        containers.forEach((c) => {
          if(c.name == ro.value.name) {
            if (ro.representation == 'contained' || ro.representation == 'contain') {
              c.contains.push({name : ro.name, required : ro.required, multiple : multiple, representation : ro.representation, value : r});
            } else if (ro.representation == 'containedInOtherContainer') {
              c.containers.push({name : ro.name, required : ro.required, multiple : multiple, representation : ro.representation, value : r});
            } else if (ro.representation == 'link') {
              c.link.push({name : ro.name, required : ro.required, multiple : multiple, representation : ro.representation, value : r});
            }
          }
        });
      });
    }
  });

  return containers;
}

function getLinksResources(resources) {
  resources.forEach((r) => {
    r.resourcesObject.forEach((ro) => {
      const multiple = (ro.array === undefined) ? false : ro.array;
      resources.forEach((c) => {
        if(c.name == ro.value.name && c.type == ro.value.type) {          
          if (ro.representation == 'link') {
            researchLinks(c, ro, r, multiple);
          } else if (ro.representation == 'inverseLink') {
            researchLinks(r, ro, c, multiple);
          }
        }
      });
    });
  });

  return resources;
}

function researchLinks(container, resourceObject, resource, multiple) {  
  let find = false;

  if (container.link) {
    container.link.forEach( l => {
      if(l.name === resourceObject.name && l.value.name === resource.name) find = true;
    })
    if(!find)
      container.link.push({name : resourceObject.name, required : resourceObject.required, multiple : multiple, representation : resourceObject.representation, value : resource});
  } else {
    container.link = [{name : resourceObject.name, required : resourceObject.required, multiple : multiple, representation : resourceObject.representation, value : resource}];
  }
}

function getBlocks(resources, containers, orderResources) {
  let blocks = [];

  resources.forEach((r) => {
    let find = false;
    if (r.representation != 'container') {
      containers.forEach((c) => {
        find = (!find) ? checkContainsResource(c, r, false) : find;
      });
      if (!find && !blocks.includes(r)) {
        for (let i = 0; i < orderResources.length; i++) {
          blocks = arrangeResources(blocks, orderResources, i, r);
        }
        if (!blocks.includes(r)) { blocks.push(r); }
      }
    }
  });

  return blocks;
}

function getNoRelationsObjects(resources, containers, blocks) {
  const noRelations = [];
  let index = -1;

  resources.forEach((r) => {
    let find = false;
    if (r.representation != 'container') {
      containers.forEach((c) => {
        find = checkContainsResource(c, r, true);
      });
      resources.forEach((c) => {
        if(c.link) {
          c.link.forEach( l => {
            if(l.value == r) {
              find = true;
            }
          })
        }
      });
      if (r.link) {
        find = true;
      }
      if (!find && !noRelations.includes(r)) {
        noRelations.push(r);
        index = blocks.indexOf(r);
      }
    }
    if (index != -1) blocks.splice(index, 1);
  });

  return noRelations;
}

function getNoRelationsModules(noRelations, containers) {
  containers.forEach((c) => {
    if (c.type == 'module') {
      let externLink = false;
      c.resources.forEach((a) => {
        if (a.link) {
          let find = false;
          a.link.forEach((l) => {
            c.resources.forEach((resource) => {
              if (resource.name == l.name && resource.type == l.type) {
                find = true;
              }
            });
          });
          if (!find) {
            externLink = true;
          }
        }
      });
      if (!externLink) noRelations.push(c);
    }
  });

  return noRelations;
}

function getContent(containers) {
  containers.forEach((c) => {
    c.resourcesObject.forEach((ro) => {
      const multiple = (ro.array === undefined) ? false : ro.array;
      if (ro.representation == 'contained' || ro.representation == 'contain') {
        c.contains.push({name : ro.name, required : ro.required, multiple : multiple, representation : ro.representation, value : ro.value});
      }
    });
  });

  return containers;
}

function getContentInContainers(containers) {
  containers.forEach((c) => {
    c.containers.forEach((cn) => {
      containers.forEach((cs) => {
        cs.contains.forEach((ctn) => {
          if (cn.value.name == ctn.value.name) {
            if (!c.contains.includes(cs)) {
              cs.inContainer = true;
              c.contains.push({name : '', value : cs});
              const index = containers.indexOf(cs);
              containers.splice(index, 1);
            }
          }
        });
      });
    });
  });

  return containers;
}

function getDimensionsContainers(containers, resourceWidthMax) {
  containers.forEach((c) => {
    const dimensions = calcul_dimensions(c, 0, resourceWidthMax);
    if (c.contains.length == 0) {
      c.width = 250;
      c.height = 90;
    } else {
      c.width = dimensions.width + 20;
      c.height = dimensions.height + 20;
    }
  });

  return containers;
}

function getResourcesInOrder(containers, blocks, orderResources) {
  let order = 0;
  const resources = [];

  while (order < containers.length + blocks.length) {
    containers.forEach((container) => {
      if (container.order == order) {
        resources.push(container);
      }
      if (order > orderResources.length && !resources.includes(container)) {
        resources.push(container);
      }
    });
    blocks.forEach((block) => {
      if (block.order == order) {
        resources.push(block);
      }
      if (order > orderResources.length && !resources.includes(block)) {
        resources.push(block);
        order = containers.length + blocks.length;
      }
    });
    order++;
  }

  return resources;
}

function getResourcesCoord(resources, noRelations, resourceWidthMax, heightMin, widthMin, windowWidthMax) {
  let xCurrent = 10;
  let yCurrent = 10;
  let widthMax = widthMin;
  let heightMax = heightMin;

  for (let i = 0; i < resources.length; i++) {
    const xy = calcul_xy_container(resources[i], xCurrent, yCurrent, resourceWidthMax);
    const coord = calculCoord(resources, noRelations, windowWidthMax, xCurrent, yCurrent, i)
    if (!coord.change && !noRelations.includes(resources[i])) {
      xCurrent = xy.x;
      yCurrent = xy.y;
      if (resources[i].height > heightMax) heightMax = resources[i].height;
    }
    if (resources[i].width > widthMax) widthMax = resources[i].width;    
    if(coord.change) { 
      yCurrent = coord.yCurrent;
      xCurrent = coord.xCurrent;
      heightMax = coord.heightMax;
    }
  }

  return {resources, widthMax, yCurrent};
}

function calculCoord(resources, noRelations, windowWidthMax, xCurrent, yCurrent, index) {
  const heightMin = 70;
  let heightMax = heightMin;
  let change = false;
  const widthNextResource = (index + 1 < resources.length && resources[index+1].width > 0) ? resources[index+1].width : 190;

  if (index + 1 < resources.length && !noRelations.includes(resources[index + 1])  && (resources[index + 1].order != resources[index].order || widthNextResource + xCurrent >= windowWidthMax)) {
    if (resources[index].height > heightMax) heightMax = resources[index].height;
    yCurrent = yCurrent + heightMax + 75;
    xCurrent = 10;
    change = true;
  } else if (index === resources.length - 1) {
    yCurrent = yCurrent + heightMax;
    xCurrent = 10;
    change = true;
  }

  return {xCurrent, yCurrent, heightMax, change};
}

function getNoRelationsCoord(noRelations, resources, yCurrent, resourceWidthMax, windowWidthMax, widthMax) {
  let xCurrent = 10
  let heightMax = 40;

  for(let i = 0; i < noRelations.length; i++) {
    let xy = calcul_xy_container(noRelations[i], xCurrent, yCurrent, resourceWidthMax);
    if(i + 1 < noRelations.length && noRelations[i+1].width + xCurrent >= windowWidthMax) {
        if(noRelations[i].height > heightMax) heightMax = noRelations[i].height;
        yCurrent = yCurrent + heightMax + 75;
        xCurrent = 10;
        heightMax = 40;
    } else if(xy.x != -1) {            
      xCurrent = xy.x;
      yCurrent = xy.y;
      if(noRelations[i].height > heightMax) heightMax = noRelations[i].height;
    }
    if(noRelations[i].width > widthMax) widthMax = noRelations[i].width;
    if(!resources.includes(noRelations[i])) resources.push(noRelations[i]);
  }

  return resources;
}

export function calculAttributesObjects(datas) {
  const widthMin = 250;
  const heightMin = 40;
  const windowWidthMax = 800;
  const resourceWidthMax = 1000;
  const orderResources = (datas.provider.length > 0) ? datas.provider[0].orderResources : [];
  
  let containers = getContainer(datas.resources, orderResources);

  containers = getModules(datas.modules, containers, orderResources);
  
  containers = getRelationsContainers(datas.resources, containers);

  datas.resources = getLinksResources(datas.resources);

  let blocks = getBlocks(datas.resources, containers, orderResources);

  let noRelations = getNoRelationsObjects(datas.resources, containers, blocks);

  noRelations = getNoRelationsModules(noRelations, containers);

  containers = getContent(containers);

  containers = getContentInContainers(containers);

  noRelations.forEach((b) => {
    b.width = 0;
    b.height = 0;
  });

  blocks.forEach((b) => {
    b.width = 0;
    b.height = 0;
  });

  containers = getDimensionsContainers(containers, resourceWidthMax);

  let resources = getResourcesInOrder(containers, blocks, orderResources);

  const results = getResourcesCoord(resources, noRelations, resourceWidthMax, heightMin, widthMin, windowWidthMax);
  resources = results.resources;
  let yCurrent = results.resources;
  let widthMax = results.widthMax;

  yCurrent += 75;

  resources = getNoRelationsCoord(noRelations, resources, yCurrent, resourceWidthMax, windowWidthMax, widthMax);

  datas.resources.forEach( resource => {
    resource.resourcesObject = []
    resource.containers = []
  })

  return resources;
}

function checkContainsResource(container, resource, links){  
  let find = false;

  container.contains.forEach( contain => {
    if(contain.value == resource) {
      find = true;
    }
  })
  container.containers.forEach( c => {
    if(c.value == resource) {
      find = true;
    }
  })
  if(links && container.link) {
    container.link.forEach( l => {
      if(l.value == resource) {
        find = true;
      }
    })
  }

  return find;
}

function calculDimensionModuleAttributes(resources, height, width) {  
  for (let i = 0; i < resources.length; i++) {
    if (i + 1 < resources.length && resources[i + 1].order != resources[i].order) {
      if (resources[i].representation != 'container') {
        height += heightMin + 15;
      } else {
        const dimensions = calculDimensionContainer(resources[i], widthMax, height, width);
        width += dimensions.width;
        height += dimensions.height;
      }
    } else if (i + 1 < resources.length && resources[i].order >= 0 && resources[i + 1].order == undefined) {
      height += heightMin + 15;
    } else {
      width += widthMin + 20;
    }
  }
  return {width, height};
}

function formatDatas(container, widthMax, remove, height, contains) {
  const initialWidth = (container.width !== undefined) ? container.width : 0;
  const initialHeight = (container.height !== undefined) ? container.height - 20 : 0;
  let index = (contains.length === 1) ? contains.length - 1 : contains.length - 2;
  let width = 0;  
  const content = (contains.length > 0 && contains[index].value) ? contains[index].value : contains[index];
  const lastX = (content !== undefined && content.drawingObject) ? content.drawingObject.x : contains.x;
  let widthResource = (lastX != undefined) ? lastX : 0;

  const dimensions = calculDimensionContainerAttributes(contains, widthMax, remove, widthResource, height, width);
  width = dimensions.width;
  height = dimensions.height;
  
  width = (width < initialWidth && !remove) ? initialWidth : width;
  height = (height < initialHeight && !remove) ? initialHeight : height;

  return {width, height};
}

function calculDimensionContainerAttributes(container, widthMax, remove, widthResource, height, width) {
  let dimensions;

  container.forEach(resource => {   
    const object = (resource.value) ? resource.value : resource;
    if (object.contains !== undefined && object.contains.length > 0) {
      dimensions = calculDimensionContainer(object, widthMax, height, width, remove);
    } else {
      object.width = 0;
      object.height = 0;
      dimensions = calculDimensionResource(width, height, widthResource, 250, widthMax, 70);
    }
    width = dimensions.width;
    height = dimensions.height;
    widthResource = dimensions.widthResource;
  });

  return {width, height, widthResource};
}

function calculDimensionResource(width, height, widthResource, widthMin, widthMax, heightMin) {
  if (widthResource + widthMin + 20 >= widthMax) {
    height += heightMin + 15;
    widthResource = widthMin + 20;
  } else if(width + widthMin + 20 < widthMax){
    width += widthMin + 20;
    widthResource = width;
  } else {
    widthResource += widthMin + 20;
  }

  return {width, height, widthResource};
}

function calculDimensionContainer(container, widthMax, height, width, remove) {
  let dimensions;
  
  if (container.contains.length > 0) {
    const object = (container.drawingObject) ? container.drawingObject : container;
    dimensions = calcul_dimensions(object, 0, widthMax, remove, container.contains);
    object.width = (object.width >= widthMax) ? object.width : (dimensions.width - 10);
    object.height = dimensions.height + 10;
  }

  if (width + dimensions.width + 30 >= widthMax) {
    width = dimensions.width + 30;
  } else {
    width += dimensions.width + 30;
  }
  let widthResource = width;
  height += dimensions.height + 40;

  return {width, height, widthResource}
}

export function calcul_dimensions(container, width, widthMax, remove, contains) {
  const widthMin = 250;
  const heightMin = 70;
  let height = heightMin + 20;
  let dimensions;
  if (container.resources) {
    dimensions = calculDimensionModuleAttributes(container.resources, height, width);
    width = dimensions.width;
    height = dimensions.height;
  } else if (container.contains && container.contains.length > 0) {
    dimensions = formatDatas(container, widthMax, remove, height, container.contains);
    width = dimensions.width;
    height = dimensions.height;
  } else if (contains && contains.length > 0) {
    dimensions = formatDatas(container, widthMax, remove, height, contains);
    width = dimensions.width;
    height = dimensions.height;
  } else {
    width = widthMin;
    height = heightMin;
  }
  return { width, height };
}

function calculCoordResource(object, x, y, parent, resourceWidthMax, heightMax) {
  const reelHeight = (object.height === 0) ? 40 : object.height;
  let returnY = -1;
  let xMax = x + ((object.width > 0) ? object.width : 220);
  if (xMax >= ((parent.width > resourceWidthMax) ? (parent.width) : resourceWidthMax)) {
    x = parent.x + 10;
    xMax = x + ((object.width > 0) ? object.width : 220);
    returnY = y + heightMax;
    heightMax = reelHeight + 30;
  }
  if(reelHeight > heightMax) {
    heightMax = reelHeight + 30;
  }
  object.x = x;
  object.y = (returnY != -1) ? returnY : y;
  return { x : xMax + 40, y: (returnY != -1) ? returnY : y, heightMax : heightMax};
}

function calculCoordContainer(object, x, y, resourceWidthMax, heightMax) {
  let returnY = -1;
  let xMax = x + ((object.width > 0) ? object.width : 220);
  if (xMax >= resourceWidthMax) {
    x = 10;
    xMax = x + ((object.width > 0) ? object.width : 220);
  }
  object.x = x;
  object.y = (returnY != -1) ? returnY : y;
  return { x : xMax + 40, y: (returnY != -1) ? returnY : y, heightMax : heightMax};
}

function calculCoordModuleAttributes(resources) {
  let cox = 20;
  let coy = 60;
  const heightMin = 40;

  for (let i = 0; i < resources.length; i++) {
    const xy = calcul_xy_container(resources[i], cox, coy, resourceWidthMax);
    cox = xy.x;
    coy = xy.y;
    resourceHeightMax = xy.resourceHeightMax;
    if ((i + 1 < resources.length && resources[i + 1].order != resources[i].order) || cox >= resourceWidthMax) {
      coy = coy + ((resources[i].height > 0) ? resources[i].height : heightMin) + 50;
      cox = 20;
    }
  }
}

function calculCoordContainerAttributes(resourceWidthMax, container, contains) {
  let cox = 20;
  let coy = 60;
  let containerHeightMax = 0;
  
  contains.forEach((content) => {
    let drawingObject = (content.value) ? content.value : content;
    drawingObject = (content.drawingObject) ? content.drawingObject : drawingObject;
    const object = (content.value) ? content.value : content;
    const xy = calculCoordResource(drawingObject, cox, coy, container, resourceWidthMax, containerHeightMax);
    cox = xy.x;
    coy = xy.y;
    containerHeightMax = xy.heightMax;
    if(object.contains) {
      calculCoordContainerAttributes(resourceWidthMax, object, object.contains)
    }
  });
}

export function calcul_xy_container(container, x, y, resourceWidthMax, contains) {
  let newX = -1;
  let newY = -1;
  let resourceHeightMax = 0;
  if (!container.inContainer) {   
    const xy = calculCoordContainer(container, x, y, resourceWidthMax, resourceHeightMax);
    newX = xy.x;
    newY = xy.y;
    resourceHeightMax = xy.heightMax;
    if (container.resources) {
      calculCoordModuleAttributes(container.resources);
    } else if (container.contains && container.contains.length > 0) {
      calculCoordContainerAttributes(resourceWidthMax, container, container.contains);
    } else if(contains) {
      calculCoordContainerAttributes(resourceWidthMax, container, contains);
    }
  }
  return { x: newX, y: newY, heightMax: resourceHeightMax };
}