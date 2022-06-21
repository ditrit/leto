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
        m.resources.forEach((resource) => {
          if (resource.type == orderResources[i]) {
            resource.order = i;
            m.contains.push(resource);
          }
          if (isArray(orderResources[i])) {
            orderResources[i].forEach((type) => {
              if (resource.type == type) {
                resource.order = i;
                m.contains.push(resource);
              }
            });
          }
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
  
  datas.resources.forEach((r) => {
    if (r.representation != 'container') {
      if (r.resourcesObject.length > 0) {
        r.resourcesObject.forEach((ro) => {
          containers.forEach((c) => {
            if (c.name == ro.value.name && ro.representation == 'contained') {
              c.contains.push({name : ro.name, value : r});
            } else if (c.name == ro.value.name && ro.representation == 'containedInOtherContainer') {
              c.containers.push({name : ro.name, value : r});
            } else if (c.name == ro.value.name && ro.representation == 'link') {
              c.link.push({name : ro.name, value : r});
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
            let find = false;
            if (c.link) {
              c.link.forEach( l => {
                if(l.name === ro.name && l.value.name === r.name) find = true;
              })
              if(!find)
                c.link.push({name : ro.name, value : r});
            } else {
              c.link = [{name : ro.name, value : r}];
            }
          } else if (c.name == ro.value.name && c.type == ro.value.type && ro.representation == 'inverseLink') {
            if (r.link && !r.link.includes({name : ro.name, value : c})) {
              r.link.push({name : ro.name, value : c});
            } else {
              r.link = [{name : ro.name, value : c}];
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
        c.contains.forEach( contain => {
          if(contain.value == r) {
            find = true;
          }
        })
        c.containers.forEach( container => {
          if(container.value == r) {
            find = true;
          }
        })
        if(c.resources) {
          c.resources.forEach( resource => {
            if(resource.value == r) {
              find = true;
            }
          })
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
        c.contains.forEach( contain => {
          if(contain.value == r) {
            find = true;
          }
        })
        c.containers.forEach( container => {
          if(container.value == r) {
            find = true;
          }
        })
        if(c.link) {
          c.link.forEach( l => {
            if(l.value == r) {
              find = true;
            }
          })
        }
      });
      datas.resources.forEach((c) => {
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
        const index = blocks.indexOf(r);
        if (index != -1) blocks.splice(index, 1);
      }
    }
  });

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

  containers.forEach((c) => {
    c.resourcesObject.forEach((ro) => {
      if (ro.representation == 'contained') {
        c.contains.push({name : ro.name, value : ro.value});
      }
    });
  });


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

function calculDimensionContainerAttributes(container, widthMax, remove, heightMin, height, contains) {
  const initialWidth = (container.width !== undefined) ? container.width : 0;
  const initialHeight = (container.height !== undefined) ? container.height - 20 : 0;
  let index = contains.length - 2;
  let dimensions, width = 0;
  if(contains.length === 1) {
    index = contains.length - 1;
  }
  const content = (contains.length > 0 && contains[index].value) ? contains[index].value : contains[index];
  const lastX = (content !== undefined && content.drawingObject) ? content.drawingObject.x : contains.x;
  let widthResource = (lastX != undefined) ? lastX : 0;
  contains.forEach(resource => {   
    const object = (resource.value) ? resource.value : resource;
    if (object.contains !== undefined && object.contains.length > 0) {
      dimensions = calculDimensionContainer(object, widthMax, height, width, remove);
    } else {
      object.width = 0;
      object.height = 0;
      dimensions = calculDimensionResource(width, height, widthResource, 250, widthMax, heightMin);
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
    dimensions = calculDimensionContainerAttributes(container, widthMax, remove, heightMin, height, container.contains);
    width = dimensions.width;
    height = dimensions.height;
  } else if (contains && contains.length > 0) {
    dimensions = calculDimensionContainerAttributes(container, widthMax, remove, heightMin, height, contains);
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

function calculCoordModuleAttributes(resources) {
  let cox = 20;
  let coy = 60;
  const heightMin = 40;

  for (let i = 0; i < resources.length; i++) {
    const xy = calcul_xy_container(resources[i], cox, coy, recourceWidthMax);
    cox = xy.x;
    coy = xy.y;
    resourceHeightMax = xy.resourceHeightMax;
    if ((i + 1 < resources.length && resources[i + 1].order != resources[i].order) || cox >= recourceWidthMax) {
      coy = coy + ((resources[i].height > 0) ? resources[i].height : heightMin) + 50;
      cox = 20;
    }
  }
}

function calculCoordContainerAttributes(recourceWidthMax, container, contains) {
  let cox = 20;
  let coy = 60;
  let containerHeightMax = 0;
  
  contains.forEach((content) => {
    const drawingObject = (content.value) ? content.value : ((content.drawingObject) ? content.drawingObject : content);
    const object = (content.value) ? content.value : content;
    const xy = calculCoordResource(drawingObject, cox, coy, container, recourceWidthMax, containerHeightMax);
    cox = xy.x;
    coy = xy.y;
    containerHeightMax = xy.heightMax;
    if(object.contains) {
      calculCoordContainerAttributes(recourceWidthMax, object, object.contains)
    }
  });
}

export function calcul_xy_container(container, x, y, recourceWidthMax, contains) {
  let newX = -1;
  let newY = -1;
  let resourceHeightMax = 0;
  if (!container.inContainer) {   
    const xy = calculCoordContainer(container, x, y, recourceWidthMax, resourceHeightMax);
    newX = xy.x;
    newY = xy.y;
    resourceHeightMax = xy.heightMax;
    if (container.resources) {
      calculCoordModuleAttributes(container.resources);
    } else if (container.contains && container.contains.length > 0) {
      calculCoordContainerAttributes(recourceWidthMax, container, container.contains);
    } else if(contains) {
      calculCoordContainerAttributes(recourceWidthMax, container, contains);
    }
  }
  return { x: newX, y: newY, heightMax: resourceHeightMax };
}