"use strict";
/**
 * WEBFLOW BASE STYLES
 * Webflow component base styles, resets, and normalize CSS
 *
 * Used by:
 * - Frontend preview canvas (iframe)
 * - React project export (webflow-defaults.css)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEBFLOW_BASE_STYLES = void 0;
// ============================================================================
// WEBFLOW BASE STYLES
// ============================================================================
exports.WEBFLOW_BASE_STYLES = `
/* Webflow Icons Font */
@font-face {
  font-family: 'webflow-icons';
  src: url("data:application/x-font-ttf;charset=utf-8;base64,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") format('truetype');
  font-weight: normal;
  font-style: normal;
}

[class^="w-icon-"],
[class*=" w-icon-"] {
  font-family: 'webflow-icons' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.w-icon-slider-right::before {
  content: "\\e600";
}

.w-icon-slider-left::before {
  content: "\\e601";
}

.w-icon-nav-menu::before {
  content: "\\e602";
}

.w-icon-arrow-down::before,
.w-icon-dropdown-toggle::before {
  content: "\\e603";
}

.w-icon-file-upload-remove::before {
  content: "\\e900";
}

.w-icon-file-upload-icon::before {
  content: "\\e903";
}

/* Base Reset - Override browser defaults */
*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Typography resets */
h1, h2, h3, h4, h5, h6 {
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
}

p, blockquote, figure, figcaption, pre {
  margin: 0;
}

/* List resets */
ul, ol, menu {
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  margin: 0;
  padding: 0;
}

/* Table resets */
table {
  border-collapse: collapse;
  border-spacing: 0;
}

th, td {
  padding: 0;
  text-align: left;
}

/* Form resets */
fieldset {
  margin: 0;
  padding: 0;
  border: none;
}

legend {
  padding: 0;
}

input, textarea, select {
  margin: 0;
  padding: 0;
  font: inherit;
  color: inherit;
}

/* Other element resets */
hr {
  margin: 0;
  border: none;
  height: 1px;
  background: currentColor;
}

address {
  font-style: normal;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  margin: 0;
  padding: 0;
  font: inherit;
  color: inherit;
  background: none;
  border: none;
  cursor: pointer;
}

:focus {
  outline: none;
}

q, blockquote {
  quotes: none;
}

q::before, q::after,
blockquote::before, blockquote::after {
  content: '';
}

/* ========== NAVBAR ========== */
.w-nav {
  position: relative;
  z-index: 1000;
  background: #ddd;
}

.w-nav::before,
.w-nav::after {
  content: " ";
  display: table;
  grid-column-start: 1;
  grid-row-start: 1;
  grid-column-end: 2;
  grid-row-end: 2;
}

.w-nav::after {
  clear: both;
}

.w-nav-brand {
  float: left;
  position: relative;
  text-decoration: none;
  color: #333;
}

.w-nav-menu {
  float: right;
  position: relative;
  display: flex;
  align-items: center;
}

.w-nav-link {
  display: inline-block;
  vertical-align: top;
  padding: 20px;
  color: #222;
  text-decoration: none;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.w-nav-link.w--current {
  color: #0082f3;
}

.w-nav-button {
  display: none;
  float: right;
  padding: 18px;
  font-size: 24px;
  cursor: pointer;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  tap-highlight-color: transparent;
  user-select: none;
}

.w-nav-button:focus {
  outline: 0;
}

.w-nav-button.w--open {
  background-color: #c8c8c8;
  color: #fff;
}

.w-nav-overlay {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  overflow: hidden;
}

.w-nav-overlay.w--open {
  display: block;
}

[data-nav-menu-open] {
  display: block !important;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #c8c8c8;
  text-align: center;
  min-width: 200px;
  overflow: visible;
}

.w--nav-link-open {
  display: block;
  position: relative;
  padding: 20px;
}

.w--nav-dropdown-open {
  display: block;
  position: relative;
}

.w--nav-dropdown-toggle-open {
  display: block;
}

.w--nav-dropdown-list-open {
  position: static;
  display: block;
}

/* Responsive breakpoints */
@media (max-width: 991px) {
  .w-nav[data-collapse="medium"] .w-nav-menu {
    display: none;
  }
  .w-nav[data-collapse="medium"] .w-nav-button {
    display: block;
  }
  .w-nav[data-collapse="medium"] .w-nav-brand {
    padding-left: 10px;
  }
}

@media (max-width: 767px) {
  .w-nav[data-collapse="small"] .w-nav-menu {
    display: none;
  }
  .w-nav[data-collapse="small"] .w-nav-button {
    display: block;
  }
}

@media (max-width: 479px) {
  .w-nav[data-collapse="tiny"] .w-nav-menu {
    display: none;
  }
  .w-nav[data-collapse="tiny"] .w-nav-button {
    display: block;
  }
}

.w-nav[data-collapse="all"] .w-nav-menu {
  display: none;
}
.w-nav[data-collapse="all"] .w-nav-button {
  display: block;
}

.w-nav-menu {
  transition: opacity 400ms ease, transform 400ms ease;
}

[data-nav-menu-open] {
  transition: opacity 400ms ease, transform 400ms ease;
}

.w-nav[data-animation="default"] [data-nav-menu-open] {
  transform: translateY(0);
}

.w-nav[data-animation="over-left"] .w-nav-overlay {
  top: 0;
  left: 0;
  right: auto;
  width: auto;
  height: 100vh;
}

.w-nav[data-animation="over-left"] [data-nav-menu-open] {
  transform: translateX(0);
}

.w-nav[data-animation="over-right"] .w-nav-overlay {
  top: 0;
  left: auto;
  right: 0;
  width: auto;
  height: 100vh;
}

.w-nav[data-animation="over-right"] [data-nav-menu-open] {
  transform: translateX(0);
}

/* ========== DROPDOWN ========== */
.w-dropdown {
  text-align: left;
  z-index: 900;
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
  position: relative;
}

.w-dropdown-btn,
.w-dropdown-toggle,
.w-dropdown-link {
  vertical-align: top;
  color: #222;
  text-align: left;
  white-space: nowrap;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  text-decoration: none;
  position: relative;
}

.w-dropdown-toggle {
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  padding-right: 40px;
  display: inline-block;
}

.w-dropdown-toggle:focus {
  outline: 0;
}

.w-icon-dropdown-toggle {
  width: 1em;
  height: 1em;
  margin: auto 20px auto auto;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
}

.w-dropdown-list {
  background: #ddd;
  min-width: 100%;
  display: none !important;
  position: absolute;
}

.w-dropdown-list.w--open {
  display: block !important;
}

.w-dropdown-link {
  color: #222;
  padding: 10px 20px;
  display: block;
}

.w-dropdown-link.w--current {
  color: #0082f3;
}

.w-dropdown-link:focus {
  outline: 0;
}

.w-dropdown[data-hover="false"] {
  display: block;
  width: 100%;
  z-index: auto;
}

.w-dropdown[data-hover="false"] .w-dropdown-toggle {
  display: flex;
  width: 100%;
  padding-right: 20px;
  justify-content: space-between;
  align-items: center;
}

.w-dropdown[data-hover="false"] .w-icon-dropdown-toggle {
  position: static;
  margin: 0;
  transition: transform 0.3s ease;
}

.w-dropdown[data-hover="false"] .w-dropdown-list {
  position: static;
  z-index: auto;
  min-width: 0;
  overflow: hidden;
}

.w-dropdown.w--open .w-icon-dropdown-toggle {
  transform: rotate(180deg);
}

/* ========== TABS ========== */
.w-tabs {
  position: relative;
}

.w-tab-menu {
  display: flex;
}

.w-tab-link {
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
}

.w-tab-content {
  position: relative;
}

.w-tab-pane {
  display: none;
}

.w-tab-pane.w--tab-active {
  display: block;
}

/* ========== SLIDER ========== */
.w-slider {
  position: relative;
  text-align: center;
  clear: both;
  background: #dddddd;
  height: 300px;
  -webkit-tap-highlight-color: transparent;
  tap-highlight-color: transparent;
}

.w-slider-mask {
  position: relative;
  display: block;
  overflow: hidden;
  z-index: 1;
  left: 0;
  right: 0;
  height: 100%;
  white-space: nowrap;
}

.w-slide {
  position: relative;
  display: inline-block;
  vertical-align: top;
  width: 100%;
  height: 100%;
  white-space: normal;
  text-align: left;
}

.w-slider-nav {
  position: absolute;
  z-index: 2;
  top: auto;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  padding-top: 10px;
  height: 40px;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
  tap-highlight-color: transparent;
}

.w-slider-nav.w-round > div {
  border-radius: 100%;
}

.w-slider-nav.w-num > div {
  width: auto;
  height: auto;
  padding: 0.2em 0.5em;
  font-size: inherit;
  line-height: inherit;
}

.w-slider-nav.w-shadow > div {
  box-shadow: 0 0 3px rgba(51, 51, 51, 0.4);
}

.w-slider-nav-invert {
  color: #fff;
}

.w-slider-nav-invert > div {
  background-color: rgba(34, 34, 34, 0.4);
}

.w-slider-nav-invert > div.w-active {
  background-color: #222;
}

.w-slider-dot {
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
  background-color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  margin: 0 3px 0.5em;
  transition: background-color 100ms, color 100ms;
}

.w-slider-dot.w-active {
  background-color: #fff;
}

.w-slider-dot:focus {
  outline: none;
  box-shadow: 0px 0px 0px 2px #fff;
}

.w-slider-dot:focus.w-active {
  box-shadow: none;
}

.w-slider-arrow-left,
.w-slider-arrow-right {
  position: absolute;
  width: 80px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  cursor: pointer;
  overflow: hidden;
  color: white;
  font-size: 40px;
  -webkit-tap-highlight-color: transparent;
  tap-highlight-color: transparent;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.w-slider-arrow-left [class^='w-icon-'],
.w-slider-arrow-right [class^='w-icon-'],
.w-slider-arrow-left [class*=' w-icon-'],
.w-slider-arrow-right [class*=' w-icon-'] {
  position: absolute;
}

.w-slider-arrow-left:focus,
.w-slider-arrow-right:focus {
  outline: 0;
}

.w-slider-arrow-left {
  z-index: 3;
  right: auto;
}

.w-slider-arrow-right {
  z-index: 4;
  left: auto;
}

.w-icon-slider-left,
.w-icon-slider-right {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 1em;
  height: 1em;
}

.w-slider-aria-label {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

.w-slider-force-show {
  display: block !important;
}

/* ========== FORMS ========== */
.w-form {
  margin: 0;
}

.w-input,
.w-select {
  display: block;
  width: 100%;
  padding: 8px 12px;
  margin-bottom: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.w-button {
  display: inline-block;
  padding: 9px 15px;
  background-color: #3898EC;
  color: white;
  border: 0;
  cursor: pointer;
}

.w-checkbox,
.w-radio {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;
}

.w-form-done {
  display: none;
  padding: 20px;
  text-align: center;
  background-color: #dddddd;
}

.w-form-fail {
  display: none;
  margin-top: 10px;
  padding: 10px;
  background-color: #ffdede;
}

/* ========== RICH TEXT ========== */
.w-richtext > :first-child {
  margin-top: 0;
}

.w-richtext > :last-child {
  margin-bottom: 0;
}

/* ========== MEDIA ========== */
.w-lightbox {
  display: inline-block;
  cursor: pointer;
}

.w-video {
  position: relative;
  padding-bottom: 56.25%;
}

.w-video iframe,
.w-video video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* ========== HTML EMBED ========== */
.w-embed::before,
.w-embed::after {
  content: " ";
  display: table;
  grid-column-start: 1;
  grid-row-start: 1;
  grid-column-end: 2;
  grid-row-end: 2;
}

.w-embed::after {
  clear: both;
}

.w-background-video {
  position: relative;
  overflow: hidden;
}

/* ========== LAYOUT ========== */
.w-inline-block {
  display: inline-block;
}

.w-container {
  max-width: 940px;
  margin: 0 auto;
}

@media (max-width: 991px) {
  .w-container {
    max-width: 728px;
  }
}

@media (max-width: 767px) {
  .w-container {
    max-width: none;
  }
}

.w-layout-grid {
  display: grid;
}

.w-layout-vflex {
  display: flex;
  flex-direction: column;
}

.w-layout-hflex {
  display: flex;
  flex-direction: row;
}

.w-layout-blockcontainer {
  display: block;
}

/* ========== FILE UPLOAD ========== */
.w-file-upload {
  display: flex;
  flex-direction: column;
}

.w-file-upload-default {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.w-file-upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 2px dashed #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.w-file-upload-input {
  display: none;
}
`.trim();
