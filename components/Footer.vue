<template lang="html">
    <section class="footer-section bg bg_img" data-background="../assets/images/footer-bg.png">
        <div class="footer-element-one">
            <img src="../assets/images/footer/footer-element-one.png" alt="element">
        </div>
        <div class="footer-element-two">
            <img src="../assets/images/footer/footer-element-two.png" alt="element">
        </div>
        <div class="footer-element-three">
            <img src="../assets/images/footer/line1.png" alt="element">
        </div>
        <div class="footer-element-four">
            <img src="../assets/images/footer/line1.png" alt="element">
        </div>
        <div class="footer-element-five">
            <img src="../assets/images/footer/line9.png" alt="element">
        </div>
        <div class="footer-element-six">
            <img src="../assets/images/footer/line9.png" alt="element">
        </div>
        <div class="footer-element-seven">
            <img src="../assets/images/footer/line3.png" alt="element">
        </div>
        <div class="footer-element-eight">
            <img src="../assets/images/footer/line5.png" alt="element">
        </div>
        <div class="footer-element-nine">
            <img src="../assets/images/footer/line5.png" alt="element">
        </div>
        <div class="footer-element-ten">
            <img src="../assets/images/footer/line5.png" alt="element">
        </div>
        <div class="footer-element-eleven">
            <img src="../assets/images/footer/line5.png" alt="element">
        </div>
        <div class="footer-element-twelve">
            <img src="../assets/images/footer/line5.png" alt="element">
        </div>
        <div class="footer-element-thirteen">
            <img src="../assets/images/footer/manyline.png" alt="element">
        </div>
        <div class="footer-element-fourteen">
            <img src="../assets/images/footer/line5.png" alt="element">
        </div>
        <div class="footer-element-fifteen">
            <img src="../assets/images/footer/line5.png" alt="element">
        </div>
        <div class="footer-element-sixteen">
            <img src="../assets/images/footer/line5.png" alt="element">
        </div>
        <div class="footer-element-seventeen">
            <img src="../assets/images/footer/circle3.png" alt="element">
        </div>
        <div class="footer-shape">
            <img src="../assets/images/footer/dotline.png" alt="element">
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="footer-bottom d-flex flex-wrap justify-content-between align-items-center">
                        <div class="footer-logo">
                            <router-link :to="{ name: 'home___'+$i18n.locale}"> 
                              <img src="../assets/images/banner/new_logo.png" class="footer_logo" alt="logo DeusSearch">
                            </router-link>
                            <p class="deus_footer_p">  {{ $t("message.general_subtitle") }}</p>
                            <p class="deus_footer_p">  {{ $t("message.general_footer_subtitle") }} </p>
                            <p class="deus_footer_p cgu">         
                                <router-link :to="{ name: 'cgu_'+$i18n.locale}" > {{ $t('message.cgu_main_title') }} </router-link> | 
                                <router-link :to="{ name: 'studio_partenaire_'+$i18n.locale}" > {{ $t('message.general_footer_menu_studios') }} </router-link> |
                                <router-link :to="{ name: 'streamers_partenaire_'+$i18n.locale}" > {{ $t('message.general_footer_menu_streamers') }} </router-link> |
                                <router-link :to="{ name: 'contact_'+$i18n.locale}"> {{ $t('message.menu_contact') }} </router-link> |
                                <router-link :to="{ name: 'presentation_'+$i18n.locale}" > {{ $t('message.menu_presentation') }} </router-link> |
                                <a href="https://twitter.com/DeusSearch"> Twitter </a> | 
                                <a href="https://www.facebook.com/DeusSearch"> Facebook </a> 
                            </p>
                        </div>
                    </div>
                    <div class="copyright-area d-flex flex-wrap justify-content-between">
                        <div class="copyright-content">
                            <p>V2.6 - Copyright © 2021. <span> All Rights Reserved By <router-link :to="{ name: 'home_'+$i18n.locale}"> 
                              DeusSearch
                            </router-link> - Association Loi 1901</span>
                            
                            </p>
                        </div>
                        <ul class="blog-social">
                            <li><a href="https://www.facebook.com/DeusSearch" target="_blank">
                                    <font-awesome-icon  :icon="['fab', 'facebook-f']" /></a></li>
                            <li><a href="https://twitter.com/DeusSearch" target="_blank" class="active">
                                    <font-awesome-icon  :icon="['fab', 'twitter']" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section> 
</template>

<style>
.footer_logo {
    width: 250px;
}
</style>
