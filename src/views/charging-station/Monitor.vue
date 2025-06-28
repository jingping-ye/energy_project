<template>
  <h1>充电站监控</h1>
  <button @click="openDialog">open Dialog</button>
  <StationAdd :dialog-visible="dialogVisible" @close="closeDialog"></StationAdd>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import StationAdd from './components/StationEdit.vue';

const dialogVisible = ref(true);
function openDialog() {
  dialogVisible.value = !dialogVisible.value;
}

function closeDialog(isVisible: boolean) {
  dialogVisible.value = isVisible;
}
</script>
