function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return null;
}

function initMap(){
    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
    addMapOverlay();//向地图添加覆盖物
}

function createMap(){
    map = new BMap.Map("map");
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

    var major = parseInt(getQueryString('c'));
    var index = parseInt(getQueryString('o'));
    if (!major)
        major = 0;
    if (!index)
        index = 0;

    var lab = mapdata[major].labs[index];

    var point = new BMap.Point(lab.loc[0], lab.loc[1]);
    map.centerAndZoom(new BMap.Point(lab.loc[0], lab.loc[1]), 16);
    var marker = new BMap.Marker(
        point,
        {
            icon: new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",
                new BMap.Size(20,25),
                {
                    imageOffset: new BMap.Size(-46, -21)
                }
            )
        }
    );

    var opts = {
        width: 300,
        title: "",
        enableMessage: true
    };
    // console.log(lab.website)
    // if (lab.hasOwnProperty('website')) {
    //     var infoWindow = new BMap.InfoWindow(lab.name + '<br />' + '地点:' + lab.place, opts + '<br />网站:' + lab.website);
    //
    // } else {
    //     var infoWindow = new BMap.InfoWindow(lab.name + '<br />' + '地点:' + lab.place, opts);
    // }
    var infoWindow = new BMap.InfoWindow(lab.name + '<br />' + '地点:' + lab.place, opts);
    addClickHandler(marker, infoWindow);
    map.addOverlay(marker);

    marker.openInfoWindow(infoWindow);
}

var map;
initMap();