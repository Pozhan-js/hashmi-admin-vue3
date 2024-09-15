<template>
  <div class="my-form">
    <el-watermark :font="font" :content="['Element+', 'Element Plus']">
      <div style="height: 500px; width: 100%; backgroundcolor: #bfc" />
    </el-watermark>

    <el-input v-focus placeholder="请输入"></el-input>

    <el-tree
      :default-expand-all="true"
      style="max-width: 600px"
      :highlight-current="true"
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <div>{{ node.label }}</div>
          <div style="margin-left: 80px">
            <a @click="() => {}">新增子目录</a>
            <a style="margin-left: 8px" @click="() => {}">编辑</a>
          </div>
        </span>
      </template>
    </el-tree>

    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="Activity name" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="Activity zone" prop="region">
        <el-select v-model="ruleForm.region" placeholder="Activity zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity count" prop="count">
        <el-select-v2
          v-model="ruleForm.count"
          placeholder="Activity count"
          :options="options"
        />
      </el-form-item>
      <el-form-item label="Activity time" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              v-model="ruleForm.date1"
              type="date"
              aria-label="Pick a date"
              placeholder="Pick a date"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="2">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker
              v-model="ruleForm.date2"
              aria-label="Pick a time"
              placeholder="Pick a time"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery" prop="delivery">
        <el-switch v-model="ruleForm.delivery" />
      </el-form-item>
      <el-form-item label="Activity location" prop="location">
        <el-segmented v-model="ruleForm.location" :options="locationOptions" />
      </el-form-item>
      <el-form-item label="Activity type" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox value="Online activities" name="type">
            Online activities
          </el-checkbox>
          <el-checkbox value="Promotion activities" name="type">
            Promotion activities
          </el-checkbox>
          <el-checkbox value="Offline activities" name="type">
            Offline activities
          </el-checkbox>
          <el-checkbox value="Simple brand exposure" name="type">
            Simple brand exposure
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio value="Sponsorship">Sponsorship</el-radio>
          <el-radio value="Venue">Venue</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Create
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch, ref } from 'vue'
import { isDark } from '@/composables/dark'

import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

interface RuleForm {
  name: string
  region: string
  count: string
  date1: string
  date2: string
  delivery: boolean
  location: string
  type: string[]
  resource: string
  desc: string
}

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: 'Hello',
  region: '',
  count: '',
  date1: '',
  date2: '',
  delivery: false,
  location: '',
  type: [],
  resource: '',
  desc: '',
})

const locationOptions = ['Home', 'Company', 'School']

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  location: [
    {
      required: true,
      message: 'Please select a location',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))

const font = reactive({
  color: '#bfc',
  size: 16,
})

interface Tree {
  label: string
  children?: Tree[]
}

const defaultProps = {
  children: 'children',
  label: 'label',
}
// tree数据
const data: Tree[] = [
  {
    label: '我上学了',
    children: [
      {
        label: '我是中国人',
      },
      {
        label: '我是小学生',
      },
      {
        label: '我爱学语文',
      },
    ],
  },
  {
    label: '识字',
    children: [
      {
        label: '我爱识字',
      },
      {
        label: '我爱学语文',
      },
      {
        label: '我爱学语文',
      },
    ],
  },
]

const handleNodeClick = (data: any) => {
  console.log(data)
}
// watch(
//   isDark,
//   () => {
//     font.color = isDark.value
//       ? 'rgba(255, 255, 255, .15)'
//       : 'rgba(0, 0, 0, .15)'
//   },
//   {
//     immediate: true,
//   },
// )
</script>

<style lang="scss" scoped>
.my-form {
  color: red;
  width: 100%;
  height: 100%;
}

.custom-tree-node {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
:deep(.el-tree) > .el-tree-node > .el-tree-node__children {
  margin: 10px;
}

:deep(.el-tree)
  > .el-tree-node
  > .el-tree-node__children
  > .el-tree-node
  > .el-tree-node__content {
  padding: 16px 0;
}

// 被选中项样式
:deep(.el-tree) > .el-tree-node .is-current {
  // background-color: #f1f6fe;
  font-weight: bold;
  color: #406de6;
}
</style>
