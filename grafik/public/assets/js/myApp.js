$(document).ready(function () {
    $('.note-editable').css('height', '900px');
    $('.note-placeholder').html('');
});

var idgambar = -1;
var id = 0;
var updateis = "j";

function updateIs(params) {
    updateis = params;
}
function isUpdate(idimg) {
    id = $("input[name='id']").val();
    idgambar = idimg;
}

function save(params) {
    switch (params) {
        case 'pages':
            const title = $("input[name=judul]").val();
            const content = $('.note-editable').html();
            var isPublic = 0;
            if ($('#isPublic').hasClass("checked")) {
                isPublic = 1;
            }
            var seo = 0;
            if ($('#idseo').hasClass("checked")) {
                seo = 1;
            }
            $.ajax({
                url: "/api/post-page",
                method: "post",
                data: {
                    'id': window.id,
                    'judul': title,
                    'content': content,
                    'seo': seo,
                    'is_public': isPublic,
                    'header_image': idgambar
                },
                success: function (data) {
                    swal("Berhasil", "Halaman anda berhasil di buat", "success");
                    window.location.replace("/halaman/daftar-halaman");
                },
                error: function (data) {
                    console.log(data);
                }
            });
            break;
        case 'agenda':
            const agendatitle = $("input[name=judul]").val();
            const agendacontent = $('.note-editable').html();
            var isPublic = 0;
            if ($('#isPublic').hasClass("checked")) {
                isPublic = 1;
            }
            var seo = 0;
            if ($('#idseo').hasClass("checked")) {
                seo = 1;
            }
            $.ajax({
                url: "/api/post-agenda",
                method: "post",
                data: {
                    'id': window.id,
                    'judul': agendatitle,
                    'content': agendacontent,
                    'seo': seo,
                    'is_public': isPublic,
                    'header_image': idgambar
                },
                success: function (data) {
                    swal("Berhasil", "Halaman anda berhasil di buat", "success");
                    window.location.replace("/agenda/daftar-agenda");
                },
                error: function (data) {
                    console.log(data);
                }
            });
            break;
        case 'berita':
            function kirim() {
                const title = $("input[name=judul]").val();
                const content = $('.note-editable').html();

                var keyWord = new Array();
                $(".spann").each(function () {
                    keyWord.push($(this).attr('value'));
                });
                var key = keyWord.join();
                console.log(key);
                var isPublic = 0;
                if ($('#isPublic').hasClass("checked")) {
                    isPublic = 1;
                }
                var categories = [];
                $.each($("input:checkbox[name='kategori']:checked"), function () {
                    categories.push($(this).val());
                });
                var send = $.post("/api/post-berita", {
                    'id': window.id,
                    'judul': title,
                    'content': content,
                    'kategori': categories.join(","),
                    'is_public': isPublic,
                    'keyword': key,
                    'header_image': idgambar
                },
                    function (data, status) {
                        swal("Berhasil", "Berita anda berhasil di publish", "success");
                        window.location.replace("/berita/daftar-berita");
                    });
            }
            kirim();
            break;
        default:
            alert('error save');
    }
}

function kategori(bool) {
    var categories = [];
    $.each($("input:checkbox[name='kategori']:checked"), function () {
        categories.push($(this).val());
    });
    if (categories.length == 0 && updateis != 'pages') {
        swal("Gagal", "Kategori tidak boleh kosong", "error");
        return 0;
    }
    return 1;
}

function tumbnail(bool) {
    if ($('#tumbnailImage').attr('src') == '') {
        swal("Peringatan", "Anda belum mengisi Gambar Utama", "error");
        return 0;
    }
    return 1;
}



var editBerita = (function () {
    let mrFrontendMethods = {};
    let title = 'The Mr Frontend JavaScript Module';

    let addEmoticon = function (data) {
        return title + ' ' + data;
    }

    mrFrontendMethods.getTitle = function (data) {
        return addEmoticon(data);
    }

    return mrFrontendMethods;
})();



$('#addkeyword').click(function () {
    var input = $('#input-keyword').val();
    if (input != "") {
        $("#keyword").append(`<span id="customkeyword${input}" value="${input}" class="spann badge badge-pill badge-sm badge-primary mr-1 mb-1">${input}
    <button type="button" class="close ml-1" style="font-size: 18px;" data-dismiss="toast" aria-label="Close" onclick="removeKeyword('#customkeyword${input}')">
        <span aria-hidden="true">&times;</span>
        </button>
    </span >`);
        $('#input-keyword').val("");
    } else {
        swal("Gagal", "Keyword tidak boleh kosong!", "error");
    }
});

function removeKeyword(item) {
    $(item).remove();
}

$(document).ready(function () {
    $('#publish').click(function () {
        var tumb = tumbnail(0);
        var kat = kategori(0);
        if (tumb == 0) {
            swal("Peringatan", "Anda belum mengisi Gambar Utama", "error");
        } else {
            if (kat != 0 || updateis == 'pages') {
                var isPublic = 0;
                if ($('#isPublic').hasClass("checked")) {
                    isPublic = 1;
                }
                if (isPublic == 0) {
                    swal({
                        title: "Apakah anda yakin?",
                        text: "Menyimpan berita di Draf",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                save(updateis);
                            } else {
                                swal("Your imaginary file is safe!");
                            }
                        });
                } else {
                    swal({
                        title: "Apakah anda yakin?",
                        text: "Menerbitkan berita ini",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                console.log(updateis);
                                save(updateis);
                            } else {
                                swal("Your imaginary file is safe!");
                            }
                        });
                }
            }
        }

    });
});

//  image services


$(document).ready(function (e) {


    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('#image').change(function () {
        let reader = new FileReader();
        reader.onload = (e) => {
            $('#preview-image-before-upload').attr('src', e.target.result);
        }
        reader.readAsDataURL(this.files[0]);
    });
    $('#image-upload').submit(function (e) {
        e.preventDefault();
        var formData = new FormData(this);
        $.ajax({
            type: 'POST',
            url: "/api/post-gambar",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: (data) => {
                this.reset();
                window.idgambar = data;
                getGambar(data);
            },
            error: function (data) {
                console.log(data);
            }
        });
    });
});

imgInp.onchange = evt => {
    const [file] = imgInp.files
    if (file) {
        blah.src = URL.createObjectURL(file)
    }
}


$("#selectgambar").click(function () {
    var idimg = $('input[name="imageRadio"]:checked').val();

    window.idgambar = idimg;
    getGambar(idimg);
});

function getGambar(id) {
    $.ajax({
        type: 'GET',
        url: "/api/get-gambar/" + id,
        cache: false,
        contentType: false,
        processData: false,
        success: (data) => {
            $('#tumbnailImage').attr('src', data['image_url']);
        },
        error: function (data) {
            console.log(data);
        }
    });
}


function fetch_data(url, page) {
    $.ajax({
        url: url + "/?page=" + page,
        success: function (data) {
            var html = "";
            var gambar = '';
            // $('#select-gambarr').html(data);
            $('.pagination').html('');
            for (let index = 0; index < data['links'].length; index++) {
                if (data['links'][index]['active'] == true) {
                    html = html.concat(
                        '<li class="page-item active" aria-current="page"><span class="page-link">' +
                        data['links'][index]['label'] + '</span></li>');
                } else if (data['links'][index]['active'] == false) {
                    if (data['links'][index]['url'] == null) {
                        html = html.concat('');
                    } else {
                        html = html.concat(
                            '<li class="page-item"><a class="page-link" href="' +
                            data['links'][index]['url'] + '">' +
                            data['links'][index]['label'] + '</a></li>');

                    }
                }
            }
            for (let index = 0; index < data['data'].length; index++) {
                gambar = gambar.concat(`<div class="col-md-3 col-6">
                             <div class="preview-block">
                                 <div class="custom-control custom-radio image-control">
                                     <input type="radio" class="custom-control-input"
                                         id="imageRadio${data['data'][index]['id']}" name="imageRadio"
                                         value="${data['data'][index]['id']}">
                                     <label class="custom-control-label"
                                         for="imageRadio${data['data'][index]['id']}"><img
                                             src="./${data['data'][index]['image_url']}" alt=""></label>
                                 </div>
                             </div>
                        </div>`);
            }
            $('#select-gambarr').html(gambar);
            $('.pagination').html(html);
        }
    });
}

