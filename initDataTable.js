// Modo de usar
// id tabla: '#example'
// colASumar es la columna de donde se obtienen los valores a Sumar
// colTotales es la cantidad de columnas totales de la tabla
// regPorPagina cantidad de registros se muestran en la tabla (para facilitar el configurado global del sistema)
// config= 'completo' muestra los botones de export
//         'simple'   no muestra botones (igualmente deja un div #buttons para insertar desde afuera un boton personalizado)
// buttonConfig recibe un array con los datos necesarios para configurar los botones
//       se debe especificar text:       nombre del boton
//                     className:  clase personalizada
//                     action:     texto a buscar dentro de la columna
//                     column:     columna en donde buscar el valor de action

function initDataTable (idTabla,colASumar,colTotales,regPorPagina,config,buttonConfig){
    colASumar = colASumar-1;
    var buttonConfig2 = [];
    buttonConfig.forEach(myFunction);
    function myFunction(item, index) {
        
        buttonConfig2.push({
            text: item.text,
            className: item.className,
            action: function(e, dt, node, config) {
                table
                    .columns(item.column)
                    .search(item.action)
                    .draw();
            }
        });
    }
    var domConfig = '<"row mt-2"<"#buttons.col-md-12"Bf>>'+ 't' + '<"row"<"col-md-6 col-lg-6 col-xl-6"i><"col-md-6 col-lg-6 col-xl-6"p>>';
    if (config=='simple'){
        domConfig = '<"row mt-2"<"#buttons.col-md-12"f>>'+ 't' + '<"row"<"col-md-6 col-lg-6 col-xl-6"i><"col-md-6 col-lg-6 col-xl-6"p>>'
    }
    var table = $(idTabla).DataTable({
            dom: domConfig,
            "iDisplayLength": regPorPagina,
            "destroy": true,
            "footerCallback": function ( row, data, start, end, display ) {
                var api = this.api(), data;
                // Total over all pages
                total = api
                    .column( colASumar )
                    .data()
                    .reduce( function (a, b) {
                        b = b.replace(/\./g,'');
                        b = b.replace(/\,/g,'.');
                        a = parseFloat(a);
                        return a + parseFloat(b);
                    }, 0 );
                // Total over this page
                pageTotal = api
                    .column( colASumar, { page: 'current'} )
                    .data()
                    .reduce( function (a, b) {
                        b = b.replace(/\./g,'');
                        b = b.replace(/\,/g,'.');
                        a = parseFloat(a);
                        return a + parseFloat(b);
                    }, 0 );

                // Update footer
                $( api.column( colASumar ).footer() ).html(
                    '$'+ number_format(pageTotal,2,',','.') +' - ($'+ number_format(total,2,',','.') +' total)'
                );
            },
            buttons: buttonConfig2,               
            columnDefs: [
                {
                    orderable: !1,
                    targets: [colTotales]
                }],
                pagingType: "full_numbers",
                pageLength: 8,
                lengthMenu: [
                    [5, 8, 15, 20],
                    [5, 8, 15, 20]
                ],
                autoWidth: !1,
                oLanguage: {
                    "sProcessing":     "Procesando...",
                    "sLengthMenu":     "Mostrar _MENU_ registros",
                    "sZeroRecords":    "No se encontraron resultados",
                    "sEmptyTable":     "Ningún dato disponible en esta tabla",
                    "sInfo":           "Mostrando _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty":      "Mostrando 0 al 0 de un total de 0 registros",
                    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix":    "",
                    "sSearch":         "Buscar:",
                    "sUrl":            "",
                    "sInfoThousands":  ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                    "sFirst":    "Primero",
                    "sLast":     "Último",
                    "sNext":     ">",
                    "sPrevious": "<"
                },
                "oAria": {
                    "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            },
            
        });

        
        if (config=='completo'){
            new $.fn.dataTable.Buttons( table, {
                buttons: [
                    {
                        text: '<i class="fa fa-files-o"></i> Copiar',
                        className: 'btn borde btn-sm mr-0 ',
                        titleAttr: "Copiar",
                        extend: "copyHtml5",
                        width: 50,
                        exportOptions: {
                            columns: ':visible:not(:last-child)',
                        }
                    },
                    {
                        extend: 'excel',
                        text: '<i class="fa fa-file-excel-o"></i> Excel',
                        className: 'btn borde btn-sm mr-0 ',
                        titleAttr: 'Excel',
                        exportOptions: {
                            columns: ':visible:not(:last-child)'
                        }
                    },
                    {
                        extend: 'csv',
                        text: '<i class="fa fa-file-text-o"></i> CSV',
                        className: 'btn borde btn-sm mr-0 ',
                        titleAttr: 'Csv',
                        exportOptions: {
                            columns: ':not(:last-child)',
                        }
                    },

                    {
                        extend: 'pdfHtml5',
                        text: '<i class="fa fa-file-pdf-o"></i> PDF',
                        className: 'btn borde btn-sm mr-0 ',
                        orientation: 'landscape',
                        titleAttr: 'Pdf',
                        exportOptions: {
                            columns: ':visible:not(:last-child)',
                        }
                    },

                    {
                        extend: 'colvis',
                        text: '<i class="fa fa-columns"></i> Columnas',
                        className: 'btn borde btn-sm mr-0 ',
                        titleAttr: 'Columnas',
                        columns: ':not(:last-child)',
                        
                    },
                ]
            });

        }
        table.buttons().container().addClass("btn-group btn-group-sm");
        if (config == 'completo'){
        table.buttons().container().appendTo($( "#buttons" ));
        }
        $(".dt-button").addClass("btn btn-alt-primary borde");
        $(".dt-button").removeClass("dt-button");
        $(".dataTables_filter").addClass("float-right");
        $(".borde").css("border","1px solid #89c1f1");
};