import { isArray } from 'mathjs';

export function calculAttributesObjects(datas) {
  const widthMin = 200;
  const heightMin = 40;
  const windowWidthMax = 2000;
  const recourceWidthMax = 1000;
  let recourceHeightMax = 0;
  let xCurrent = 10;
  let yCurrent = 10;
  const containers = [];
  const blocks = [];
  const noRelations = [];
  const orderResources = (datas.provider.length > 0) ? datas.provider[0].orderResources : [];

  datas.resources.forEach((r) => {
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
        if (c.contains.includes(r)) {
          find = true;
        } else if (c.containers.includes(r)) {
          find = true;
        } else if (c.attributes && c.attributes.includes(r)) {
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
        if (c.contains.includes(r)) {
          find = true;
        } else if (c.containers.includes(r)) {
          find = true;
        } else if (c.link && c.link.includes(r)) {
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
            c.attributes.forEach((a) => {
              if (a.name == l.name && a.type == l.type) {
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
      c.width = 0;
      c.height = 0;
    } else {
      c.width = dimensions.width + 20;
      c.height = dimensions.height + 20;
    }
    recourceHeightMax = dimensions.recourceHeightMax;
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
    const xy = calcul_xy_container(resources[i], xCurrent, yCurrent);
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
    let xy = calcul_xy_container(noRelations[i], xCurrent, yCurrent);
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
  })

  return resources;
}

function calcul_dimensions(container, width, widthMax) {
  const widthMin = 190;
  const heightMin = 70;
  let height = heightMin + 20;
  if (container.attributes) {
    for (let i = 0; i < container.contains.length; i++) {
      if (i + 1 < container.contains.length && container.contains[i + 1].order != container.contains[i].order) {
        if (container.contains[i].representation != 'container') {
          height += heightMin + 15;
        } else {
          const dimensions = calcul_dimension_container(container.contains[i], widthMax, heightMin);
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
    container.contains.forEach((c) => {
      if (c.representation != 'container') {
        if (width + widthMin + 20 >= widthMax) {
          height += heightMin + 15;
        } else {
          width += widthMin + 20;
        }
      } else {
        const dimensions = calcul_dimension_container(c, widthMax, heightMin);
        width += dimensions.width + 20;
        height += dimensions.height;
      }
    });
  } else {
    width = widthMin;
    height = heightMin;
  }
  return { width, height };
}

function calcul_dimension_container(container, widthMax, heightMin) {
  let width = 0; let
    height = 0;
  if (container.contains.length > 0) {
    if (!container.width && !container.height) {
      const dimensions = calcul_dimensions(container, 0, widthMax);
      width += dimensions.width;
      height += dimensions.height;
      container.width = dimensions.width;
      container.height = dimensions.height + 20;
    } else {
      if (container.height >= height) {
        height += container.height - heightMin;
      }
      if (width + container.width >= widthMax) {
        height += container.height + 40;
        width += 20;
      } else {
        height += 40;
        width += container.width + 20;
      }
    }
  }
  return { width, height, height };
}

function calcul_xy(object, x, y, container, recourceHeightMax) {
  if (object.representation != 'container') {
    object.width = 0;
    object.height = 0;
  }

  let returnY = -1;
  let xMax = x + ((object.width > 0) ? object.width : 160);
  if (xMax >= ((container) ? (container.width + container.x) : widthMax)) {
    x = ((container) ? container.x : 0);
    xMax = x + ((object.width > 0) ? object.width : 160);
    returnY = (!container) ? (y + recourceHeightMax + 50) : y;
    if (!container) {
      recourceHeightMax = returnY + recourceHeightMax;
    }
  }
  object.x = x;
  object.y = (returnY != -1) ? returnY : y;
  x = xMax + 50;

  return { x, y: (returnY != -1) ? returnY : y, recourceHeightMax };
}

function calcul_xy_container(container, x, y, content, recourceHeightMax, parent) {
  let newX = -1;
  let newY = -1;
  const heightMin = 40;
  if (!container.inContainer || content) {
    const xy = calcul_xy(container, x, y, true, recourceHeightMax);
    newX = xy.x;
    newY = xy.y;
    if (content) {
      const parentX = ((parent.parentX) ? parent.parentX : parent.x)
      const parentY = ((parent.parentY) ? parent.parentY : parent.y)
      container.parentX = parentX + container.x
      container.parentY = parentY + container.y
    }
    recourceHeightMax = xy.recourceHeightMax;

    if (container.attributes) {
      let cox = 20;
      let coy = 60;

      for (let i = 0; i < container.contains.length; i++) {
        const xy = calcul_xy_container(container.contains[i], cox, coy, true, recourceHeightMax, container);
        cox = xy.x;
        coy = xy.y;
        if (i + 1 < container.contains.length && container.contains[i + 1].order != container.contains[i].order) {
          coy = coy + ((container.contains[i].height > 0) ? container.contains[i].height : heightMin) + 50;
          cox = 20;
        }
      }
    } else if (container.contains && container.contains.length > 0) {
      let cox = 20;
      let coy = 60;

      container.contains.forEach((co) => {
        const xy = calcul_xy_container(co, cox, coy, true, recourceHeightMax, container);
        cox = xy.x;
        coy = xy.y;
        recourceHeightMax = xy.recourceHeightMax;
      });
    } 
  }
  return { x: newX, y: newY, recourceHeightMax };
}
