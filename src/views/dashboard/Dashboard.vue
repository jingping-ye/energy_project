<template>
  <el-row>
    <el-col :span="18">
      <el-card>
        <div class="title">
          <h3>今日设备运行状态</h3>
          <p class="update-time">更新时间：2025年06月27日</p>
          <el-icon color="#86909c" style="margin-left: 5px">
            <Refresh></Refresh>
          </el-icon>
        </div>
        <div class="equipment">
          <div class="equipment-item">
            <h4>充电桩使用率</h4>
            <img :src="flash" />
          </div>
        </div>
      </el-card>
      <el-card>
        <template #header>
          <h3>常用功能</h3>
        </template>
      </el-card>
    </el-col>
    <el-col :span="6"></el-col>
  </el-row>
</template>
<script setup lang="ts">
import flash from '@/assets/flash.png';
import flash2 from '@/assets/flash2.png';
import flash3 from '@/assets/flash2.png';
</script>
<style lang="less" scoped>
.title {
  display: flex;
  flex-direction: row;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  align-items: flex-end;

  .update-time {
    color: #86909c;
    margin-left: 5px;
  }
}
</style>
