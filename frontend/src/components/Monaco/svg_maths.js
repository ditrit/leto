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

export function calcul_dimensions(container, width, widthMax, remove) {
  const widthMin = 250;
  const heightMin = 70;
  let height = heightMin + 20;
  if (container.attributes) {
    for (let i = 0; i < container.contains.length; i++) {
      if (i + 1 < container.contains.length && container.contains[i + 1].order != container.contains[i].order) {
        if (container.contains[i].representation != 'container') {
          height += heightMin + 15;
        } else {
          const dimensions = calcul_dimension_container(container.contains[i], widthMax);
          width += dimensions.width;
          height += dimensions.height;
        }
      } else if (i + 1 < container.contains.length && container.contains[i].order >= 0 && container.contains[i + 1].order == undefined) {
        height += heightMin + 15;
      } else {
        width += widthMin + 20;
      }
    }
  } else if (container.contains && container.contains.length > 0) {
    const initialWidth = (container.width !== undefined) ? container.width : 0;
    const initialHeight = (container.height !== undefined) ? container.height - 20 : 0;
    let index = container.contains.length - 2;
    if(container.contains.length === 1) {
      index = container.contains.length - 1;
    }
    const lastX = container.contains[index].x;
    let widthResource = (lastX != undefined) ? lastX : 0;
    container.contains.forEach(c => {
      if (c.representation != 'container') {
        if (widthResource + widthMin + 20 >= widthMax) {
          height += heightMin + 15;
          widthResource = widthMin + 20;
        } else if(width + widthMin + 20 < widthMax){
          width += widthMin + 20;
          widthResource = width;
        } else {
          widthResource += widthMin + 20;
        }
      } else {
        const dimensions = calcul_dimension_container(c, widthMax);
        if (width + dimensions.width + 30 >= widthMax) {
          height += dimensions.height + 30;
          width = (dimensions.width > width) ? dimensions.width + 30 : width + 30;
          widthResource = width;
        } else if(width + dimensions.width + 30 < widthMax){
          width += dimensions.width + 30;
          height += dimensions.height + 30;
          widthResource = width;
        } else {
          widthResource += dimensions.width + 30;
        }
      }
    });
    width = (width < initialWidth && !remove) ? initialWidth : width;
    height = (height < initialHeight && !remove) ? initialHeight : height;
  } else {
    width = widthMin;
    height = heightMin;
  }
  return { width, height };
}

function calcul_dimension_container(container, widthMax) {
  let width = 0; 
  let height = 0;
  if (container.contains.length > 0) {
    const dimensions = calcul_dimensions(container, 0, widthMax);
    width += dimensions.width;
    height += dimensions.height + 20;
    container.width = (container.width >= widthMax) ? container.width : (dimensions.width - 10);
    container.height = height;
  }
  return {width, height}
}

function calcul_xy(object, x, y, isContent, parent, recourceWidthMax, heightMax, heightMin) {
  if (object.representation != 'container') {
    object.width = 0;
    object.height = 0;
  }
  const reelHeight = (object.height === 0) ? heightMin : object.height;
  let returnY = -1;
  let xMax = x + ((object.width > 0) ? object.width : 220);
  if (xMax >= ((isContent && parent.width > recourceWidthMax) ? (parent.width) : recourceWidthMax)) {
    x = ((isContent) ? (parent.x + 10) : 10);
    xMax = x + ((object.width > 0) ? object.width : 220);
    returnY = (isContent) ? (y + heightMax) : -1;
    heightMax = (isContent) ? reelHeight + 30 : heightMax;
  }
  if(isContent && reelHeight > heightMax) {
    heightMax = reelHeight + 30;
  }
  object.x = x;
  object.y = (returnY != -1) ? returnY : y;
  x = xMax + 40;
  return { x, y: (returnY != -1) ? returnY : y, heightMax : heightMax};
}

export function calcul_xy_container(container, x, y, recourceWidthMax, resourceHeightMax, content, parent) {
  let newX = -1;
  let newY = -1;
  const heightMin = 40;
  if(!content) resourceHeightMax = 0;
  if (!container.inContainer || content) {  
    let xy = calcul_xy(container, x, y, content, parent, recourceWidthMax, resourceHeightMax, heightMin);
    newX = xy.x;
    newY = xy.y;
    resourceHeightMax = xy.heightMax;
    if (content) {
      const parentX = ((parent.parentX) ? parent.parentX : parent.x)
      const parentY = ((parent.parentY) ? parent.parentY : parent.y)
      container.parentX = parentX + container.x
      container.parentY = parentY + container.y
    }
    if (container.attributes) {
      let cox = 20;
      let coy = 60;

      for (let i = 0; i < container.contains.length; i++) {
        xy = calcul_xy_container(container.contains[i], cox, coy, recourceWidthMax, resourceHeightMax, true, container);
        cox = xy.x;
        coy = xy.y;
        resourceHeightMax = xy.resourceHeightMax;
        if ((i + 1 < container.contains.length && container.contains[i + 1].order != container.contains[i].order) || cox >= recourceWidthMax) {
          coy = coy + ((container.contains[i].height > 0) ? container.contains[i].height : heightMin) + 50;
          cox = 20;
        }
      }
    } else if (container.contains && container.contains.length > 0) {
      let cox = 20;
      let coy = 60;
      let containerHeightMax = 0;

      container.contains.forEach((co) => {
        xy = calcul_xy_container(co, cox, coy, recourceWidthMax, containerHeightMax, true, container);
        cox = xy.x;
        coy = xy.y;
        containerHeightMax = xy.heightMax;
      });
    } 
  }
  return { x: newX, y: newY, heightMax: resourceHeightMax };
}