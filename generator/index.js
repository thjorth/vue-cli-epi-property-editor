module.exports = (api, options, rootOptions) => {
    console.log('options', options);
    console.log('rootOptions', rootOptions);
    api.render('./template', { 
        editorName: 'generatedEditor',
        editorNameLC: 'generatededitor',
    });

    api.postProcessFiles(files => {

    });
}