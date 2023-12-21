/*�������*/
/*$(document).ready(function ()*/
/*$(window).load(function ()*/

var hShowView = new HShowView();

$(window).load(function () {
    var image = document.getElementById("hshowview_thumbImage_0");
    hShowView.pageWidth = image.naturalWidth;

    hShowView.setCurrentPage(0);
    console.log("setCurrentPage in window load");
});

$(document).ready(function () {
    hShowView.begin("#hshowview_sidebar"); //id ȣ���

});

function device() {
    isIE = navigator.userAgent.match(/msie/i) || navigator.userAgent.match(/trident/i),
    isFirefox = navigator.userAgent.match(/firefox/i),
    isChrome = navigator.userAgent.match(/chrome/i),
    isMobileBrowser = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),

    language = (navigator.userLanguage || navigator.language).toLowerCase()
}

function HShowView() {
    currentPage = 0;
    pageWidth = 0;
    //������Ƽ �����ϱ�
    this.$sideBar = null;

    //������ ����
    this.$selectPage = null;
}

HShowView.prototype.begin = function (selector) {
    var self = this;
    self.init(selector);
    self.initView();
    self.showSidebar(true);
}

//�ʱ�ȭ
HShowView.prototype.init = function (selector) {
    this.elem_sidebar = $("#hshowview_sidebar");
    this.elem_content = $("#hshowview_content");
}

HShowView.prototype.initView = function () {
    this.initEventListeners();
}

HShowView.prototype.initEventListeners = function () {
    var self = this;

    $(document).keydown(function (e) { self.handleKeyDown(e); });

    var thumbBox = $(this.elem_sidebar).find(".hshowview_thumbBox");
    $(thumbBox).click(function (e) {
        var pageNo = parseInt($(this).attr("id").split("_")[2], 10);
        self.handleThumbBoxClick(pageNo);
    });
}

HShowView.prototype.handleThumbBoxClick = function (pageNo) {
    this.setCurrentPage(pageNo);
}

HShowView.prototype.setCurrentPage = function (pageNo) {
    this.currentPage = pageNo;
    this.updateThumbBoxStatus();
}

HShowView.prototype.updateThumbBoxStatus = function () {
    if (!this.elem_sidebar) return;
    var self = this;

    //���õ� ������ ��Ÿ�� ó��
    $(this.elem_sidebar).find(".hshowview_thumbBox").each(function () {
        var pageNo = parseInt($(this).attr("id").split("_")[2], 10);
        if (pageNo == self.currentPage) {
            if (!$(this).hasClass("hshowview_current")) {
                $(this).addClass("hshowview_current");
            }
        }
        else {
            $(this).removeClass("hshowview_current");
        }

    });

    self.showSidebar(true);
}

HShowView.prototype.showSidebar = function (show) {
    var currentWidth = $(this.elem_sidebar).width();
    if (this.pageWidth > currentWidth) {
        $(this.elem_sidebar).css("width", this.pageWidth * 1.27 + "px");
        $(this.elem_content).css("left", this.pageWidth * 1.30 + "px");
        //Ȯ���۾�
        //currentWidth = $(this.elem_sidebar).width();
    }

    $(this.elem_sidebar).show();
}

