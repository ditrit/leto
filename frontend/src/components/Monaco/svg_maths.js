import { isArray } from 'mathjs';
export function calculAttributesObjects(datas) {
  const widthMin = 250;
  const heightMin = 40;
  const windowWidthMax = 800;
  const recourceWidthMax = 1000;
  let xCurrent = 10;
  let yCurrent = 10;
  const containers = [];
  const blocks = [];
  const noRelations = [];
  const orderResources = (datas.provider.length > 0) ? datas.provider[0].orderResources : [];
  datas.resources.forEach((r) => {
		r.id = r.name + "_" + r.type;
    if (r.representation == 'container') {
      r.contains = [];
      r.link = [];
      r.containers = [];
      for (let i = 0; i < orderResources.length; i++) {
        if (r.type == orderResources[i]) {
          r.order = i;
          containers.push(r);
        }
        if (isArray(orderResources[i])) {
          orderResources[i].forEach((type) => {
            if (r.type == type) {
              r.order = i;
              containers.push(r);
            }
          });
        }
      }
      if (!containers.includes(r)) { containers.push(r); }
    }
  });

  datas.modules.forEach((m) => {
    if (m.representation == 'container') {
      m.contains = [];
      m.containers = [];
      for (let i = 0; i < orderResources.length; i++) {
        m.attributes.forEach((attribute) => {
          if (attribute.type == orderResources[i]) {
            attribute.order = i;
            m.contains.push(attribute);
          }
          if (isArray(orderResources[i])) {
            orderResources[i].forEach((type) => {
              if (attribute.type == type) {
                attribute.order = i;
                m.contains.push(attribute);
              }
            });
          }
        });
      }
      m.attributes.forEach((attribute) => {
        if (!m.contains.includes(attribute) && attribute.representation == 'contained') {
          m.contains.push(attribute);
        }
      });
      containers.push(m);
    }
  });
  
  datas.resources.forEach((r) => {
    if (r.representation != 'container') {
      if (r.resourcesObject.length > 0) {
        r.resourcesObject.forEach((ro) => {
          containers.forEach((c) => {
            if (c.name == ro.value.name && ro.representation == 'contained') {
              c.contains.push(r);
            } else if (c.name == ro.value.name && ro.representation == 'containedInOtherContainer') {
              c.containers.push(r);
            } else if (c.name == ro.value.name && ro.representation == 'link') {
              c.link.push(r);
            }
          });
        });
      }
    }
  });

  datas.resources.forEach((r) => {
    if (r.resourcesObject.length > 0) {
      r.resourcesObject.forEach((ro) => {
        datas.resources.forEach((c) => {
          if (c.name == ro.value.name && c.type == ro.value.type && ro.representation == 'link') {
            if (c.link && !c.link.includes(r)) {
              c.link.push(r);
            } else {
              c.link = [r];
            }
          } else if (c.name == ro.value.name && c.type == ro.value.type && ro.representation == 'inverseLink') {
            if (r.link && !r.link.includes(c)) {
              r.link.push(c);
            } else {
              r.link = [c];
            }
          }
        });
      });
    }
  });

  datas.resources.forEach((r) => {
    let find = false;
    if (r.representation != 'container') {
      containers.forEach((c) => {
        if (c.contains.includes(r) || c.containers.includes(r) || (c.attributes && c.attributes.includes(r))) {
            find = true;
        } 
      });
      if (!find && !blocks.includes(r)) {
        for (let i = 0; i < orderResources.length; i++) {
          if (r.type == orderResources[i]) {
            r.order = i;
            blocks.push(r);
          }
          if (isArray(orderResources[i])) {
            orderResources[i].forEach((type) => {
              if (r.type == type) {
                r.order = i;
                blocks.push(r);
              }
            });
          }
        }
        if (!blocks.includes(r)) { blocks.push(r); }
      }
    }
  });

  datas.resources.forEach((r) => {
    let find = false;
    if (r.representation != 'container') {
      containers.forEach((c) => {
        if (c.contains.includes(r) || c.containers.includes(r) || (c.link && c.link.includes(r))) {
          find = true;
        }
      });
      datas.resources.forEach((c) => {
        if (c.link && c.link.includes(r)) {
          find = true;
        }
      });
      if (r.link) {
        find = true;
      }
      if (!find && !noRelations.includes(r)) {
        noRelations.push(r);
        const index = blocks.indexOf(r);
        if (index != -1) blocks.splice(index, 1);
      }
    }
  });

  containers.forEach((c) => {
    if (c.type == 'module') {
      let externLink = false;
      c.attributes.forEach((a) => {
        if (a.link) {
          let find = false;
          a.link.forEach((l) => {
            c.attributes.forEach((attribute) => {
              if (attribute.name == l.name && attribute.type == l.type) {
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

  containers.forEach((c) => {
    c.resourcesObject.forEach((ro) => {
      if (ro.representation == 'contained') {
        c.contains.push(ro.value);
      }
    });
  });

  containers.forEach((c) => {
    c.containers.forEach((cn) => {
      containers.forEach((cs) => {
        cs.contains.forEach((ctn) => {
          if (cn.name == ctn.name) {
            if (!c.contains.includes(cs)) {
              cs.inContainer = true;
              c.contains.push(cs);
              const index = containers.indexOf(cs);
              containers.splice(index, 1);
            }
          }
        });
      });
    });
  });

  noRelations.forEach((b) => {
    b.width = 0;
    b.height = 0;
  });

  blocks.forEach((b) => {
    b.width = 0;
    b.height = 0;
  });

  containers.forEach((c) => {
    const dimensions = calcul_dimensions(c, 0, recourceWidthMax);
    if (c.contains.length == 0) {
      c.width = 250;
      c.height = 90;
    } else {
      c.width = dimensions.width + 20;
      c.height = dimensions.height + 20;
    }
  });

  const resources = [];
  let order = 0;

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

  order = 0;
  let heightMax = heightMin;
  let widthMax = widthMin;

  for (let i = 0; i < resources.length; i++) {
    const xy = calcul_xy_container(resources[i], xCurrent, yCurrent, recourceWidthMax);
    const widthNextResource = (i + 1 < resources.length && resources[i+1].width > 0) ? resources[i+1].width : 190
    if (i + 1 < resources.length && !noRelations.includes(resources[i + 1])  && (resources[i + 1].order != resources[i].order || widthNextResource + xCurrent >= windowWidthMax)) {
      if (resources[i].height > heightMax) heightMax = resources[i].height;
      yCurrent = yCurrent + heightMax + 75;
      xCurrent = 10;
      heightMax = heightMin;
    } else if (i === resources.length - 1) {
      yCurrent = yCurrent + heightMax;
      xCurrent = 10;
      heightMax = heightMin;
    } else if (xy.x != -1 && xy.y != -1 && !noRelations.includes(resources[i])) {
      xCurrent = xy.x;
      yCurrent = xy.y;
      if (resources[i].height > heightMax) heightMax = resources[i].height;
    }
    if (resources[i].width > widthMax) widthMax = resources[i].width;
  }

  yCurrent += 75;
  xCurrent = 10
  heightMax = heightMin;

  for(let i = 0; i < noRelations.length; i++) {
    let xy = calcul_xy_container(noRelations[i], xCurrent, yCurrent, recourceWidthMax);
    if(i + 1 < noRelations.length && noRelations[i+1].width + xCurrent >= windowWidthMax) {
        if(noRelations[i].height > heightMax) heightMax = noRelations[i].height;
        yCurrent = yCurrent + heightMax + 75;
        xCurrent = 10;
        heightMax = heightMin;
    } else if(xy.x != -1 && xy.y != -1) {            
        xCurrent = xy.x;
        yCurrent = xy.y;
        if(noRelations[i].height > heightMax) heightMax = noRelations[i].height;
    }
    if(noRelations[i].width > widthMax) widthMax = noRelations[i].width;
    if(!resources.includes(noRelations[i])) resources.push(noRelations[i]);
  }

  datas.resources.forEach( resource => {
    resource.resourcesObject = []
    resource.containers = []
  })

  return resources;
}

function calculDimensionModuleAttributes(attributes, height, width) {  
  for (let i = 0; i < attributes.length; i++) {
    if (i + 1 < attributes.length && attributes[i + 1].order != attributes[i].order) {
      if (attributes[i].representation != 'container') {
        height += heightMin + 15;
      } else {
        const dimensions = calculDimensionContainer(attributes[i], widthMax, height, width);
        width += dimensions.width;
        height += dimensions.height;
      }
    } else if (i + 1 < attributes.length && attributes[i].order >= 0 && attributes[i + 1].order == undefined) {
      height += heightMin + 15;
    } else {
      width += widthMin + 20;
    }
  }
  return {width, height};
}

function calculDimensionContainerAttributes(container, widthMax, remove, widthMin, heightMin, height) {
  const initialWidth = (container.width !== undefined) ? container.width : 0;
  const initialHeight = (container.height !== undefined) ? container.height - 20 : 0;
  let index = container.contains.length - 2;
  let dimensions, width = 0;
  if(container.contains.length === 1) {
    index = container.contains.length - 1;
  }
  const lastX = container.contains[index].x;
  let widthResource = (lastX != undefined) ? lastX : 0;
  container.contains.forEach(resource => {    
    if (resource.representation != 'container') {
      resource.width = 0;
      resource.height = 0;
      dimensions = calculDimensionResource(width, height, widthResource, widthMin, widthMax, heightMin);
    } else {
      dimensions = calculDimensionContainer(resource, widthMax, height, width, remove);
    }
    width = dimensions.width;
    height = dimensions.height;
    widthResource = dimensions.widthResource;
  });
  width = (width < initialWidth && !remove) ? initialWidth : width;
  height = (height < initialHeight && !remove) ? initialHeight : height;

  return {width, height};
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
    dimensions = calcul_dimensions(container, 0, widthMax, remove);
    container.width = (container.width >= widthMax) ? container.width : (dimensions.width - 10);
    container.height = dimensions.height + 10;
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

export function calcul_dimensions(container, width, widthMax, remove) {
  const widthMin = 250;
  const heightMin = 70;
  let height = heightMin + 20;
  let dimensions;
  if (container.attributes) {
    dimensions = calculDimensionModuleAttributes(container.attribute, height, width);
    width = dimensions.width;
    height = dimensions.height;
  } else if (container.contains && container.contains.length > 0) {
    dimensions = calculDimensionContainerAttributes(container, widthMax, remove, widthMin, heightMin, height);
    width = dimensions.width;
    height = dimensions.height;
  } else {
    width = widthMin;
    height = heightMin;
  }
  return { width, height };
}

function calculCoordResource(object, x, y, parent, recourceWidthMax, heightMax) {
  const reelHeight = (object.height === 0) ? 40 : object.height;
  let returnY = -1;
  let xMax = x + ((object.width > 0) ? object.width : 220);
  if (xMax >= ((parent.width > recourceWidthMax) ? (parent.width) : recourceWidthMax)) {
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

function calculCoordContainer(object, x, y, recourceWidthMax, heightMax) {
  let returnY = -1;
  let xMax = x + ((object.width > 0) ? object.width : 220);
  if (xMax >= recourceWidthMax) {
    x = 10;
    xMax = x + ((object.width > 0) ? object.width : 220);
  }
  object.x = x;
  object.y = (returnY != -1) ? returnY : y;
  return { x : xMax + 40, y: (returnY != -1) ? returnY : y, heightMax : heightMax};
}

function calculCoordModuleAttributes(attributes) {
  let cox = 20;
  let coy = 60;
  const heightMin = 40;

  for (let i = 0; i < attributes.length; i++) {
    const xy = calcul_xy_container(attributes[i], cox, coy, recourceWidthMax);
    cox = xy.x;
    coy = xy.y;
    resourceHeightMax = xy.resourceHeightMax;
    if ((i + 1 < attributes.length && attributes[i + 1].order != attributes[i].order) || cox >= recourceWidthMax) {
      coy = coy + ((attributes[i].height > 0) ? attributes[i].height : heightMin) + 50;
      cox = 20;
    }
  }
}

function calculCoordContainerAttributes(recourceWidthMax, container) {
  let cox = 20;
  let coy = 60;
  let containerHeightMax = 0;
  
  container.contains.forEach((content) => {
    const xy = calculCoordResource(content, cox, coy, container, recourceWidthMax, containerHeightMax);
    cox = xy.x;
    coy = xy.y;
    containerHeightMax = xy.heightMax;
    getParentPosition(content, container);
    if(content.contains) {
      calculCoordContainerAttributes(recourceWidthMax, content)
    }
  });
}

function getParentPosition(resource, parent) {  
  const parentX = ((parent.parentX) ? parent.parentX : parent.x)
  const parentY = ((parent.parentY) ? parent.parentY : parent.y)
  resource.parentX = parentX + resource.x
  resource.parentY = parentY + resource.y
}

export function calcul_xy_container(container, x, y, recourceWidthMax) {
  let newX = -1;
  let newY = -1;
  let resourceHeightMax = 0;
  if (!container.inContainer) {   
    const xy = calculCoordContainer(container, x, y, recourceWidthMax, resourceHeightMax);
    newX = xy.x;
    newY = xy.y;
    resourceHeightMax = xy.heightMax;
    if (container.attributes) {
      calculCoordModuleAttributes(container.attributes);
    } else if (container.contains && container.contains.length > 0) {
      calculCoordContainerAttributes(recourceWidthMax, container);
    }
  }
  return { x: newX, y: newY, heightMax: resourceHeightMax };
}