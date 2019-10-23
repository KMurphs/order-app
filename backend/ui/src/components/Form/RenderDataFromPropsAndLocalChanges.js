import { useState } from 'react'



const useRenderDataFromPropsAndLocalChanges = function(initialPropsData) {

    const [latchedPrevPropsData, setLatchedPrevPropsData] = useState(JSON.parse(JSON.stringify(initialPropsData || null)));
    const [unsavedUpdatedData, setUnsavedUpdatedData] = useState(null);



    let setRenderDataFromLocalChanges = (_localChanges) => {
        let localChanges = JSON.parse(JSON.stringify(_localChanges || null))
        setUnsavedUpdatedData(localChanges);
        // console.log('Latched local changes:', localChanges)
    }
    let setRenderDataFromLocalKeyValue = (localChanges, key, value) => {
        localChanges[key] = value;
        setRenderDataFromLocalChanges(localChanges)
    }



    let getRenderDataFromCurrentProps = (_currentPropsData) => {

        let currentPropsData = JSON.parse(JSON.stringify(_currentPropsData || null))
        let dataWillBeUsedForRender = currentPropsData || (getObjectCopyWithDefaultValues(currentPropsData))

        if (JSON.stringify(latchedPrevPropsData) !== JSON.stringify(currentPropsData)) {
            setLatchedPrevPropsData(currentPropsData);
            setUnsavedUpdatedData(null);
            // console.log('Latched props Data:', currentPropsData)
        } else {
            if (unsavedUpdatedData !== null) {
                dataWillBeUsedForRender = unsavedUpdatedData;
                // console.log('Latched props Data was overriden by: ', unsavedUpdatedData);
            }
        }

        // console.log('Data to Be Rendered: ', dataWillBeUsedForRender);
        return dataWillBeUsedForRender
    }




    return [getRenderDataFromCurrentProps, setRenderDataFromLocalChanges, setRenderDataFromLocalKeyValue]
}




// No support for nested objects
const getObjectCopyWithDefaultValues = (srcObject) => {
    let objCopy = null
    if (srcObject === null) {
        objCopy = null
    } else if (typeof srcObject === 'object') {
        objCopy = {}
        Object.keys(srcObject).forEach(key => objCopy[key] = getDefaultValuesFromType(srcObject[key]))
    } else {
        objCopy = getDefaultValuesFromType(srcObject)
    }

    return objCopy;
}
const getDefaultValuesFromType = (variable) => {
    let defaultValue = null
    switch (typeof variable) {
        case 'string':
            defaultValue = ''
            break;
        case 'number':
            defaultValue = 0
            break;
        default:
            break;
    }
    return defaultValue
}
export { useRenderDataFromPropsAndLocalChanges, getObjectCopyWithDefaultValues }