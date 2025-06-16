var UmsAddressUploadColumn = {
    columns: [
        {
            data: "catSeq"
        },
        {
            data: 'firstName'
        },
        {
            data: 'mobile'
        },
        {
            data: 'eMail1'
        },
        {
            data: 'homeFax'
        },
        {
            data: 'department'
        },
        {
            data: 'grpSeq'
        }

    ],
    columnDefs: [{
        'targets': 0,
        'searchable': false,
        'orderable': false,
        'className': 'dt-body-center',
        'render': function (data, type, full, meta) {
//console.log(full);
            return '<div class="checkbox_center">'
                + '<input type="checkbox" class="dt-check-box" name="catSeq-Ck" value="' + data + '"/>'
                + ' <label class="dt-check-box-label" for="dt-check-box"></label>'
                + '</div>'
        }
    }, {
        "targets": 6,
        "visible": false,
        "searchable": false
    }
    ]
}