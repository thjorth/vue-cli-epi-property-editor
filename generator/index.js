module.exports = (api, options, rootOptions) => {
    console.log('options', options);
    console.log('rootOptions', rootOptions);
    api.render('./template', { 
        options: {
            editorName: options.name,
            editorNameLowerCase: options.name.toLowerCase(),
        }
    });

    api.postProcessFiles(files => {

    });
}