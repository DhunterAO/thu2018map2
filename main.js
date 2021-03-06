var category;
var open;
var x;
var y;
var z;
var lab_list = [];

function init_menu(){
    var container = document.getElementById("contain");
    var menu;
    for (var i=0;i<mapdata.length;i++)
    {
        var major = mapdata[i].major;
        var labs = mapdata[i].labs;
        menu=document.createElement('div');
        menu.setAttribute("class", "btn-group");
        menu.setAttribute("style", "width:100%;");
        container.appendChild(menu);
        var sub_menu = document.createElement('div');
        sub_menu.setAttribute("class", "button btn-group");
        menu.appendChild(sub_menu);

        var major_box = document.createElement('button');
        major_box.id = major;
        major_box.innerText = major;
        major_box.setAttribute("class", "btn btn-default dropdown-toggle dropdown btn-info");
        major_box.setAttribute("type", "button");
        major_box.setAttribute("data-toggle", "dropdown");
        major_box.setAttribute("aria-expanded", "false");
        sub_menu.appendChild(major_box);

        var caret = document.createElement('span');
        caret.setAttribute("class", "caret");
        major_box.appendChild(caret);

        var lab_ul = document.createElement('ul');
        lab_ul.setAttribute("class", "dropdown-menu");
        lab_ul.setAttribute("role", "menu");
        lab_ul.setAttribute("style", "min-width: 100px;");
        sub_menu.appendChild(lab_ul);


        for (var j=0;j<labs.length;j++)
        {
            console.log(labs[j]);
            var lab_bar = document.createElement('li');
            lab_ul.appendChild(lab_bar);

            var lab_link = document.createElement('a');
            lab_link.innerText = labs[j].name;
            lab_link.setAttribute("style", "word-break:break-all;white-space:normal; border-bottom: 1px solid;");
            lab_link.setAttribute("href", "https://dhunterao.github.io/thu2018map2/map.html?c="+i+"&o="+j);
            lab_bar.appendChild(lab_link);
        }
    }

    $("#"+major).addClass("btn-info"); // 追加样式


    if (open)
    {
        x = lab_list[open].loc[0];
        y = lab_list[open].loc[1];
        z = 16;
        lab_list[open].isOpen=1;
        var lab_name = lab_list[open].name;
        $("title").html("清华2018校庆地图 | " + lab_name);
    }else
    {
        x = mapdata[major].center[0];
        y = mapdata[major].center[1];
        z = 16;
        $("title").html("清华2018校庆地图 | " + "开放实验室一览");
    }
}



init_menu();
