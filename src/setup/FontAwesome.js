import { library } from "@fortawesome/fontawesome-svg-core";
import {  } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faSoundcloud, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/**
 * @param {import("vue").VueConstructor} vue Vue.js コンストラクタ
 */
export function setupFontAwesome(vue) {
  library.add(faTwitter, faSoundcloud, faGithub)
  vue.component('fa-icon', FontAwesomeIcon);
}