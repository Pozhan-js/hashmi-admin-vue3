<template>
  <div class="my-upload">
    <!--   :auto-upload="false" -->
    <el-upload
      :action="`/mgtvOss/upload?uploader=${'梁艳'}`"
      v-model:file-list="fileList"
      :limit="3"
      list-type="picture-card"
      :before-upload="handleUploadBefore"
      :on-success="handleUploadSuccess"
    >
      <el-icon><Plus /></el-icon>

      <template #file="{ file, index }">
        <div style="width: 100%; height: 100%">
          <div
            class="progress"
            v-if="file.status == 'ready' || file.status == 'uploading'"
          >
            <el-progress
              type="circle"
              :stroke-width="3"
              :show-text="true"
              :percentage="file.percentage"
            ></el-progress>
          </div>
          <div class="upload-utile" v-else>
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <div>
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <el-icon><zoom-in /></el-icon>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <el-icon><Download /></el-icon>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file, index)"
                >
                  <el-icon><Delete /></el-icon>
                </span>
              </div>
            </span>
          </div>
        </div>
      </template>
    </el-upload>

    <!-- 文件预览 -->
    <el-dialog v-model="dialogVisible">
      <el-image :src="dialogImageUrl" alt="Preview Image" fit="fill" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import type { UploadFile, UploadRawFile } from 'element-plus'

interface IFileData {
  url: string
  name: string
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const showProgress = ref(false)
const fileList = ref<IFileData[]>([])

const handleUploadBefore = () => {
  showProgress.value = true
  console.log('上传前置')
}

// const handleUploadSuccess = () => {
//   showProgress.value = false
// }
const handleUploadSuccess: UploadProps['onSuccess'] = (
  { data },
  uploadFile,
) => {
  showProgress.value = false
  dialogImageUrl.value = data.fileFullPath
}

// 删除按钮
const handleRemove = (file: UploadFile, rawFile?: UploadRawFile) => {
  let currentIndex = fileList.value.findIndex((item: any) => {
    return item.ui的 === file.uid
  })

  fileList.value.splice(currentIndex, 1)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
}
</script>

<style scoped lang="scss"></style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
