<template>
  <div>
    <b-button variant="primary" @click="showHelp" id="help_button">
      <i class="fas fa-question-circle"></i>
      <span v-if="!isShowingHelp">Help</span>
      <span v-else>Hide Help</span>
    </b-button>
    <b-modal
        v-model="isShowingHelp"
        id="help_modal"
        title="Welcome to SignalMap!"
        size="lg"
        centered
        busy
    >

      <div>
        <b-carousel
            id="help_carousel"
            v-model="slide"
            controls
            indicators
            img-width="800"
            img-height="500"
        >
          <b-carousel-slide
              v-for="(slide, index) in slides"
              :key="index"
              :img-src="slide.img"
              :caption="slide.title"
              :text="slide.desc"
          />
        </b-carousel>
      </div>
      <template #modal-footer id="help_footer">
        <b>Ta aplikacja została wykonana jako przedmiot pracy inżynierskiej.</b>
        Autor: Adam Krzysztof Lisowski, opiekun: dr Cezary Bołdak, Politechnika Białostocka 2022
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "HelpButton",
  data() {
    return {
      isShowingHelp: false,
      slides: [
        {
          img: "https://i.imgur.com/XQQZQZL.png",
          title: "Welcome to SignalMap!",
          desc: "This is a tool for displaying coverage simulations of FM radio, DAB/DAB+ and TV transmitters around the world. Transmitters database is kindly provided by FMList. Coverage simulations were calculated using SPLAT! tool.\nRemember, that presented data is not real, but a simulation of the real situation.\nIt is not meant to be used for any serious purpose."
        },
        {
          img: "https://i.imgur.com/XQQZQZL.png",
          title: "Search the database",
          desc: "Click the search button and enter the band of the transmitter (FM/DAB/TV) you are looking for and country. You can also search by ERP power, frequency, location, station name and antenna polarisation."
        },
        {
          img: "https://i.imgur.com/XQQZQZL.png",
          title: "Choose transmitters",
          desc: "Click on particular transmitter you want to check and then click the \"Add selected\" button. You can also add all found transmitters at once by clicking \"Add all\""
        },
        {
          img: "https://i.imgur.com/XQQZQZL.png",
          title: "Check the coverage",
          desc: "Click the \"Show transmitters\" button to see the transmitters you have selected. Click the \"Show\" button to see it's coverage simulation on the map. You can also hide displayed transmitters by clicking the \"Hide\" button and delete them from this list by clicking the \"Delete\" button."
        },
        {
          img: "https://i.imgur.com/XQQZQZL.png",
          title: "Display more data",
          desc: "Click on particular transmitter you want to check and the popup with more data will appear."
        }
      ]
    };
  },
  methods: {
    showHelp() {
      this.isShowingHelp = !this.isShowingHelp;
    }
  }
}
</script>

<style scoped>
#help_button {
  margin: 5px;
}

#help_footer {
  text-align: center;
  font-size: x-small;
}
</style>