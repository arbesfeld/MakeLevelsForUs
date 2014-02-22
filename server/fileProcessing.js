
var handler = {
    "fileHandler": function (options) {
        var data = {
            blob: options.blob,
            fileRecord: options.fileRecord
        };
        return data;
    }
};

Images.fileHandlers(handler);