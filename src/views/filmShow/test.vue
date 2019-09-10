<template>
  <div class="swiper-container swiper-container-h">
    <div class="swiper-wrapper">
      <div class="swiper-slide flex-column">
		<div>
			<img class="header-img" src="img.jpg" />
		</div>
        <div class="swiper-container swiper-container-v h-600">
          <div class="swiper-wrapper">
            
            <div class="swiper-slide color-red">Vertical Slide 2</div>
            <div class="swiper-slide color-blue">Vertical Slide 3</div>
			<div class="swiper-slide color-green">Vertical Slide 1</div>
            <div class="swiper-slide color-red">Vertical Slide 4</div>
            <div class="swiper-slide color-blue">Vertical Slide 5</div>
          </div>
          <div class="swiper-pagination swiper-pagination-v"></div>
        </div>
      </div>
      <div class="swiper-slide flex-column">
		<div>
			<img class="header-img" src="img.jpg" />
		</div>
        <div class="swiper-container swiper-container-v h-600">
          <div class="swiper-wrapper">
            <div class="swiper-slide color-green">Vertical Slide 1</div>
            <div class="swiper-slide color-red">Vertical Slide 2</div>
            <div class="swiper-slide color-blue">Vertical Slide 3</div>
            <div class="swiper-slide color-red">Vertical Slide 4</div>
            <div class="swiper-slide color-blue">Vertical Slide 5</div>
          </div>
          <div class="swiper-pagination swiper-pagination-v"></div>
        </div>
      </div>
	  <div class="swiper-slide flex-column">
		<div>
			<img class="header-img" src="img.jpg" />
		</div>
        <div class="swiper-container swiper-container-v h-600">
          <div class="swiper-wrapper">
			<div class="swiper-slide color-blue">Vertical Slide 5</div>
            <div class="swiper-slide color-green">Vertical Slide 1</div>
            <div class="swiper-slide color-red">Vertical Slide 2</div>
            <div class="swiper-slide color-blue">Vertical Slide 3</div>
            <div class="swiper-slide color-red">Vertical Slide 4</div>
            
          </div>
          <div class="swiper-pagination swiper-pagination-v"></div>
        </div>
      </div>
      <div class="swiper-slide">Horizontal Slide 3</div>
      <div class="swiper-slide">Horizontal Slide 4</div>
    </div>
    <!-- Add Pagination -->
    <div class="swiper-pagination swiper-pagination-h"></div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      
    }
  },
  mounted(){
    var swiperH = new Swiper('.swiper-container-h', {
	  resistanceRatio: 0,
	   slidesPerView: 'auto',
		spaceBetween: 0,
		slidesPerView: 3,
		      autoplay: {
        delay: 2500,
        disableOnInteraction: true,
      },
	  loop: true,
    });
    var swiperV = new Swiper('.swiper-container-v', {
      direction: 'vertical',
	  resistanceRatio: 0,
	  	   slidesPerView: 'auto',
		spaceBetween: 0,
		     slidesPerView: 3,
			       autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
	  loop: true,
    });
  }
}
</script>

<style lang="scss" scoped>
html, body {
      position: relative;
      height: 100%;
    }
    body {
      background: #eee;
      font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 14px;
      color:#000;
      margin: 0;
      padding: 0;
    }
    .swiper-container {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;

      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }
    .swiper-container-v {
      background: #eee;
    }
	.color-green{
		background-color:green;
	}
	.color-red{
		background-color:red;
	}
	.color-blue{
		background-color:blue;
	}
	.header-img{
		height:200px;
		width:100%;
		display:block;
	}
	.h-600{
		height:600px;
	}
	.flex-column{
		flex-direction: column;
	}
</style>

