<template>
  <div>
    <q-layout container style="height: 1150px">
      <q-toolbar>
        <div class="row">
          <q-btn
            flat
            @click="drawer = !drawer"
            round
            dense
            icon="menu"
            :class="drawer ? 'menuStyle hiddenMenu' : ' menuStyle visibleMenu'"
          />
        </div>
      </q-toolbar>
      <q-drawer
        v-model="drawer"
        @hide="makeMenuVisible"
        show-if-above
        @click.capture="drawerClick"
        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      >
        <q-header class="bg-black"> </q-header>
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> Inbox </q-item-section>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section> Star </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section> Send </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section> Drafts </q-item-section>
          </q-item>
        </q-list>

        <!--
          in this case, we use a button (can be anything)
          so that user can switch back
          to mini-mode
        -->
        <!-- <div
          class="q-mini-drawer-hide absolute"
          style="top: 15px; right: -17px"
        >
          <q-btn
            dense
            round
            unelevated
            color="accent"
            icon="chevron_left"
            @click="miniState = true"
          />
        </div> -->
      </q-drawer>

      <q-page-container>
        <q-page class="q-px-lg q-py-md">
          <h1>the Source viewer</h1>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      drawer: ref(false),
    };
  },
};
</script>

<style lang="sass" scoped>
.menuStyle
  background: #eeeeee
  border-radius: 0
  margin-top: -16px
.hiddenMenu
  transform: translateX(188px)
.visibleMenu
  transform: translateX(-14px)
</style>
