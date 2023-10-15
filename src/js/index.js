$(function () {
  let isRotated = false;

  $(".button").on("click", function () {
    if (isRotated) {
      // 이미 회전된 상태라면 초기 상태로 회전
      $(".button button").css({
        transform: "rotateZ(0deg)",
        transition: "ease-in-out 0.2s",
        color: "black",
      });
      $(".text a:eq(0)").css({
        color: "black",
        transition: "ease-in-out 0.2s",
      });
      $(".menu__list").css({
        transform: "translateX(-100%)",
        transition: "ease-in-out 0.8s",
      });
    } else {
      // 초기 상태라면 90도 회전
      $(".button button").css({
        transform: "rotateZ(90deg)",
        transition: "ease-in-out 0.2s",
        color: "white",
      });
      $(".text a:eq(0)").css({
        color: "white",
        transition: "ease-in-out 1s",
      });
      $(".menu__list").show().css({
        transform: "translateX(0%)",
        transition: "ease-in-out 0.8s",
      });
    }

    // 회전 상태를 토글
    isRotated = !isRotated;
  });
});
