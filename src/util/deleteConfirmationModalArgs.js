const args = {
    resourceId: -1,
    resourceName: "",
    deleteCallback: null
};

export const deleteConfirmationModalArgs = (resourceId, resourceName, deleteCallback) => {
    args.resourceId = resourceId;
    args.resourceName = resourceName;
    args.deleteCallback = deleteCallback;
    return args;
}