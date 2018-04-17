var category;
var open;
var x;
var y;
var z;
var marker = [];
var time =[];
var n;

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return null;
}


function init_menu(){
    for(var j=0;j<mapdata.length;j+=1){
        var cat = mapdata[j].category;
        console.log(j, cat);
        var arr = mapdata[j].data.markers;
        var menu = $('#'+cat+'_menu');
        for(var i=0;i<arr.length;i+=1){
                var node = "<li><a style=\"word-break:break-all;white-space:normal; border-bottom: 1px solid;\" href='?c="+j+"&o="+i+"'>"+ arr[i].title +"</a></li>";
                menu.append(node);
        }
    }

    category = parseInt(getQueryString('c'));
    open = parseInt(getQueryString('o'));

    if(!category){
        category = 0;
    }

    cat = mapdata[category].category;
    console.log(cat);
    $("#"+cat).addClass("btn-info"); // 追加样式 

    markers = mapdata[category].data.markers;
    plOpts = mapdata[category].data.plOpts;
    plPath = mapdata[category].data.plPath;
    labels = mapdata[category].data.labels;

    //x = mapdata[category].data.center[0];
    //y = mapdata[category].data.center[1];
    //z = mapdata[category].data.center[2];
    //z = parseInt(z);

    if (open)
    {
        x = markers[open].position.lng;
        y = markers[open].position.lat;
        z = 16;
        markers[open].isOpen=1;
        var event_name = markers[open].title;
        $("title").html("清华2018校庆地图 | " + event_name);
    }else
    {
        x = mapdata[category].data.center[0];
        y = mapdata[category].data.center[1];
        z = 16;
        $("title").html("清华2018校庆地图 | " + "一图在手，活动全有");
    }
}


function initMap(){
      createMap();//创建地图
      setMapEvent();//设置地图事件
      addMapControl();//向地图添加控件
      addMapOverlay();//向地图添加覆盖物
    }
    function createMap(){ 
      map = new BMap.Map("map"); 
      map.centerAndZoom(new BMap.Point(x,y),z);
    }
    function setMapEvent(){
      map.enableScrollWheelZoom();
      map.enableKeyboard();
      map.enableDragging();
      map.enableDoubleClickZoom()
    }
    function addClickHandler(target,window){
      target.addEventListener("click",function(){
        target.openInfoWindow(window);
      });
    }

    //向地图添加控件
    function addMapControl()
    {
      var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:1});
      map.addControl(navControl);
    }

    function addMapOverlay(){
      n = markers.length;
      for(var index = 0; index < markers.length; index++)
      {
        var point = new BMap.Point(markers[index].position.lng, markers[index].position.lat);
        marker[index] = new BMap.Marker(
                        point,
                        {
                            icon: new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",
                            new BMap.Size(20,25),
                            {
                                imageOffset: new BMap.Size(markers[index].imageOffset.width, markers[index].imageOffset.height)
                            }
                            )
                        }
                    );

        var opts = {
          width: 200,
          title: "",
          enableMessage: true
        };
        var infoWindow = new BMap.InfoWindow(markers[index].title + '<br />' + markers[index].date + '  ' + markers[index].time + '<br />' + markers[index].place, opts);

        time[index] = 0;
        if (markers[index].date.indexOf('27') !== -1)
            time[index] |= 1;

        if (markers[index].date.indexOf('28') !== -1)
            time[index] |= 2;

        if (markers[index].date.indexOf('29') !== -1)
            time[index] |= 4;

        addClickHandler(marker[index], infoWindow);
        map.addOverlay(marker[index]);

        if(markers[index].isOpen==1){
            marker[index].openInfoWindow(infoWindow);
        }
      }


        //for(var index = 0; index < labels.length; index++){
        //var opt = { position: new BMap.Point(labels[index].position.lng,labels[index].position.lat )};
        //var label = new BMap.Label(" " + labels[index].content,opt);
        //map.addOverlay(label);
        //};

        for(index = 0; index < plPath.length; index++){
            var polyLine = new BMap.Polyline(plPath[index].path,plPath[index].opt);
            map.addOverlay(polyLine);
        }
    }

var all;

function show(){

}

function chooseAll() {
    all = document.getElementsByName("click");
    if (all[0].checked){
        for (var i=1;i<all.length;i++)
        {
            all[i].checked = true;
        }
        for (var i=0;i<n;i++)
        {
            marker[i].show();
        }
    }else
    {
        for (i=1;i<all.length;i++)
        {
            all[i].checked = false;
        }
        for (var i=0;i<n;i++)
        {
            marker[i].hide();
        }
    }
    show();
}

function choose27() {
    all = document.getElementsByName("click");
    if (all[1].checked){
        all[0].checked = all[2].checked && all[3].checked;
        for (var i=0;i<n;i++)
        {
            console.log(time[i] & 1);
            if ((time[i] & 1) === 1)
                marker[i].show();
        }
    }else {
        all[0].checked = false;
        for (var i=0;i<n;i++)
        {
            if ((time[i] | 1) === 1)
                marker[i].hide();
        }
    }
    show();
}

function choose28() {
    all = document.getElementsByName("click");
    if (all[2].checked){
        all[0].checked = all[1].checked && all[3].checked;
        for (var i=0;i<n;i++)
        {
            if ((time[i] & 2) === 2)
                marker[i].show();
        }
    }else {
        all[0].checked = false;
        for (var i=0;i<n;i++)
        {
            if ((time[i] | 2) === 2)
                marker[i].hide();
        }
    }
    show();
}

function choose29() {
    all = document.getElementsByName("click");
    if (all[3].checked){
        all[0].checked = all[2].checked && all[1].checked;
        for (var i=0;i<n;i++)
        {
            if ((time[i] & 4) === 4)
                marker[i].show();
        }
    }else {
        all[0].checked = false;
        for (var i=0;i<n;i++)
        {
            if ((time[i] | 4) === 4)
                marker[i].hide();
        }
    }
    show();
}

init_menu();
    
var map;
initMap();