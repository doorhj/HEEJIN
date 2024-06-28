$(function () {
    // 스크롤 위치 console.log
    // intro - 0 , about - 1123.5 , skills 2247 , 
    var scrollValue = $(document).scrollTop();

    function saveScrollPosition() {
        localStorage.setItem('scrollPosition', window.scrollY);
    }
    
    // 페이지를 새로고침-스크롤 저장
    function reloadAndScroll() {
        const scrollPosition = localStorage.getItem('scrollPosition');
        if (scrollPosition !== null) {
            window.scrollTo(0, parseInt(scrollPosition, 10));
            localStorage.removeItem('scrollPosition');
        }
    }
    
    window.onresize = function() {
        saveScrollPosition();
        location.reload();
    };
    
    window.onload = function() {
        reloadAndScroll();
    };

    // 인트로 텍스트 타이핑
    var typed = new Typed('.pr', {
        strings: ["SIMPLE THING- <br> <span>SPECIAL THINK</span><p>단순한 것에서 특별한 생각을 이끌어내는 웹 퍼블리셔 문희진입니다.</p>"],
        typeSpeed: 70,
        backSpeed: 30,
        smartBackspace: true,
        showCursor: false,
        backDelay: 2000,
        startDelay: 1500,
        loop: true,
    });

    // 마우스 커서
    const $cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', function (e) {
        $cursor.style.left = e.clientX + 'px';
        $cursor.style.top = e.clientY + 'px';
    });

    $(".mouse").on("mouseover", function () {
        $(".cursor").css({
            "position": "fixed",
            "width": "30px",
            "height": "30px",
            "border-radius": "50%",
            "background-color": "#f5f7f8",
            "transition": "transform 0.2s",
            "mix-blend-mode": "difference",
            "transform": "scale(2) translate(-50%, -50%)",
            "pointer-events": "none",
            "z-index": "999",
        });
    });

    $(".mouse").on("mouseout", function () {
        $(".cursor").css({
            "position": "fixed",
            "width": "30px",
            "height": "30px",
            "border-radius": "50%",
            "background-color": "#f5f7f8",
            "transition": "transform 0.2s",
            "mix-blend-mode": "difference",
            "transform": "translate(-50%, -50%)",
            "pointer-events": "none",
            "z-index": "999",
        });
    });

    // 헤더 스크롤 감지 이벤트
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll < 950) {
            $(".logo").html('<a href="#"><img src="images/logo.svg" alt="logo1"></a>');
            $(".main a").css("color", "#f5f7f8");
            $(".main").addClass("white");
        }
        else if (scroll >= 950, scroll < 3000) {
            $(".logo").html('<a href="#"><img src="images/logo2.svg" alt="logo2"></a>');
            $(".main a").css("color", "#010102");
            $(".main").removeClass("white");
        }
        else if (scroll >= 3000, scroll < 7900) {
            $(".logo").html('<a href="#"><img src="images/logo.svg" alt="logo1"></a>');
            $(".main a").css("color", "#f5f7f8");
            $(".main").addClass("white");
        }
        else {
            $(".logo").html('<a href="#"><img src="images/logo2.svg" alt="logo2"></a>');
            $(".main a").css("color", "#010102");
            $(".main").removeClass("white");
        }
    });

    // 플로우 배너
    $(".banner").marquee({
        duration: 9000,
        gap: 10,
        duplicated: true,
        pauseOnHover: true,
        startVisible: true,
    });

    // 원형 그래프
    $("#circle1, #circle2").circleProgress({
        value: 75 / 100,
        startAngle: 300,
        size: 150,
        thickness: 10,
        fill: "#dcdedf",
        animation: {
            duration: 2200,
            easing: "swing"
        },
        lineCap: "butt",
        reverse: true,
    });

    $("#circle3, #circle4, #circle8").circleProgress({
        value: 60 / 100,
        startAngle: 300,
        size: 150,
        thickness: 10,
        fill: "#dcdedf",
        animation: {
            duration: 2200,
            easing: "swing"
        },
        lineCap: "butt",
        reverse: true,
    });

    $("#circle5, #circle6").circleProgress({
        value: 80 / 100,
        startAngle: 300,
        size: 150,
        thickness: 10,
        fill: "#dcdedf",
        animation: {
            duration: 2200,
            easing: "swing"
        },
        lineCap: "butt",
        reverse: true,
    });

    $("#circle7").circleProgress({
        value: 90 / 100,
        startAngle: 300,
        size: 150,
        thickness: 10,
        fill: "#dcdedf",
        animation: {
            duration: 2200,
            easing: "swing"
        },
        lineCap: "butt",
        reverse: true,
    });

    // 플러그인
    gsap.registerPlugin(ScrollTrigger);

    // 원형 그래프 애니메이션 스크롤 트리거 적용
    function initializeCircleProgress(selector, value) {
        $(selector).circleProgress({
            value: value,
            startAngle: 300,
            size: 150,
            thickness: 10,
            fill: "#7900FF",
            animation: {
                duration: 2200,
                easing: "swing"
            },
            lineCap: "butt",
            reverse: true,
        });
    }

    const circles = [
        { selector: "#circle1", value: 75 / 100 },
        { selector: "#circle2", value: 75 / 100 },
        { selector: "#circle3", value: 60 / 100 },
        { selector: "#circle4", value: 60 / 100 },
        { selector: "#circle5", value: 80 / 100 },
        { selector: "#circle6", value: 80 / 100 },
        { selector: "#circle7", value: 90 / 100 },
        { selector: "#circle8", value: 60 / 100 }
    ];

    circles.forEach(circle => {
        ScrollTrigger.create({
            trigger: circle.selector,
            start: "top 80%",
            onEnter: () => initializeCircleProgress(circle.selector, circle.value)
        });
    });

    // 아코디언 메뉴 및 projects 풀페이지 스크롤

    function createScrollTriggers() {
        $('#projects ul li').each(function () {
            var project = $(this);
            var procon = project.find('.procon');

            ScrollTrigger.create({
                trigger: project,
                start: "top+=600 center",
                end: "bottom center",
                onEnter: function () {
                    gsap.to(procon, { marginTop: -600, duration: 1.5 });
                },
                onLeaveBack: function () {
                    gsap.to(procon, { marginTop: -60, duration: 1.5 });
                },
            });
        });

        ScrollTrigger.create({
            trigger: "#projects",
            start: "top top",
            end: "+=1100",
            pin: true,
            // pinSpacing: true,
        });

        $('#projects2 ul li').each(function () {
            var project2 = $(this);
            var procon2 = project2.find('.procon');

            ScrollTrigger.create({
                trigger: project2,
                start: "top+=600 center",
                end: "bottom center",
                onEnter: function () {
                    gsap.to(procon2, { marginTop: -600, duration: 1.5 });
                },
                onLeaveBack: function () {
                    gsap.to(procon2, { marginTop: -60, duration: 1.5 });
                },
            });
        });

        ScrollTrigger.create({
            trigger: "#projects2",
            start: "top top",
            end: "+=1100",
            pin: true,
            // pinSpacing: true
        });
    }

    createScrollTriggers();

    // 새로 고침
    $(window).on('resize', function() {
        ScrollTrigger.refresh();
    });

    // 모달
    $(".modalopen").click(function () {
        $(".modal").fadeIn(500);
        $(".modalbg").fadeIn(500);
    });
    $(".modal .close").click(function () {
        $(".modal").hide();
        $(".modalbg").hide();
    });

    $(".modalopen2").click(function () {
        $(".modal2").fadeIn(500);
        $(".modalbg").fadeIn(500);
    });
    $(".modal2 .close").click(function () {
        $(".modal2").hide();
        $(".modalbg").hide();
    });


    $(".modalimg").on('mouseenter', function () {
        const rect = this.getBoundingClientRect();
        const imgwidth = rect.width;
        const imgheight = rect.height;

        $(this).off('mousemove').on('mousemove', function (e) {
            const xPos = (e.clientX - rect.left) / imgwidth * 100;
            const yPos = (e.clientY - rect.top) / imgheight * 100;

            $(this).css('--x', xPos + '%');
            $(this).css('--y', yPos + '%');
        });
    })
});

