export function toStringResource(resource, type, container) {
	let resourceToString = `${type} "${resource.type}" "${resource.name}" {\n`;
	resourceToString += (resource.objects) ? toStringObjects(resource.objects.value, resource) : '';
	resourceToString += (resource.attributesOutputLinks) ? toStringLinks(resource.attributesOutputLinks, true) : '';
	resourceToString += (resource.attributesInputLinks) ?toStringLinks(resource.attributesInputLinks, false) : '';
    if(container !== undefined && container.length > 0) resourceToString += toStringContainer(resource, container);
	resourceToString += `}\n`;
	return resourceToString;
}

export function toString(object, type) {
	let objectToString;
    if(object.type !== undefined) objectToString = `${type} "${object.type}" "${object.name}" {\n`;
    else objectToString = `${type} "${object.name}" {\n`;
	objectToString += toStringObjects(object.objects.value);
	objectToString += `}\n`;
	return objectToString;
}

function toStringObjects(objects, resource) {
	let res = '';
	objects.forEach( object => {
		if(typeof(object) === 'object') {
			res += `  ${object.name} {\n`;
			object.objects.forEach((o) => {
				res += `    ${o}\n`;
			});
			res += '  }\n';
		} else if(resource !== undefined && resource.attributes !== undefined){
            let find = false;
            resource.attributes.forEach( attribute => {
                if(attribute.representation !== undefined && attribute.variableName === object.split('=')[0]) {
                    find = true;
                }
            })
            if(!find) {
                res += `  ${object}\n`;
            }
        } else {
            res += `  ${object}\n`;
        }
	})
	return res;
}

function toStringLinks(links, output) {
	let res = '';
    let variableNames = [];


	links.forEach( link => {

		if(output && link.representation === 'link') {
            if(link.multiple && !variableNames.includes(link.variableName)) {
                variableNames.push(link.variableName);
                res += toStringArray(links, link.variableName, output);
            } else if(!link.multiple) {
                res += `  ${link.variableName} = ${link.targetType}.${link.targetName}\n`;
            }
		} else if(!output && link.representation === 'inverseLink') {
            if(link.multiple && !variableNames.includes(link.variableName)) {
                variableNames.push(link.variableName);
                res += toStringArray(links, link.variableName, output);
            } else if(!link.multiple) {
                res += `  ${link.variableName} = ${link.sourceType}.${link.sourceName}\n`;
            }
        }
	})
	return res;
}

function toStringArray(resources, variableName, output, variableType) {
	let res = `  ${variableName} = [`;
	resources.forEach( resource => {
        if(variableName === resource.variableName && output) {
            res += `${resource.targetType}.${resource.targetName}, `;
        } else if(variableName === resource.variableName && !output) {
            res += `${resource.sourceType}.${resource.sourceName}, `;
        } else if(variableType !== undefined && variableType === resource.type) {
            res += `${resource.type}.${resource.name}, `;
        }
	})
    res = res.slice(0, -2);
    res += ']\n';
	return res;
}


function toStringContainer(resource, containers) {
	let res = '';
    let variableTypes = [];

    if(resource.attributes) {
        resource.attributes.forEach( attribute => {
            if(attribute.representation === 'contained' || attribute.representation === 'containedInOtherContainer') {
                containers.forEach( container => {
                    if(container.type === attribute.resourceType) {
                        res += `  ${attribute.variableName} = ${container.type}.${container.name}\n`;
                    }
                })
                if(!attribute.resourceType) {
                    res += `  ${attribute.variableName} = ${containers[0].type}.${containers[0].name}\n`;
                }
            } else if(attribute.representation === 'contain') {
                resource.contains.forEach( content => {
                    if(attribute.array && !variableTypes.includes(attribute.resourceType)) {
                        variableTypes.push(attribute.resourceType);
                        res += toStringArray(resource.contains, attribute.variableName, false, attribute.resourceType);
                    } else if(!attribute.array) {
                        res += `  ${attribute.variableName} = ${content.type}.${content.name}\n`;
                    }
                })
            }
        })
    }
	return res;
}
