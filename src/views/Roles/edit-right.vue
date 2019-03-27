<template>
  <el-dialog title="角色授权" :visible.sync="RoleRightVisible" align="center">
    <!-- 树形控件 -->
    <el-tree
      :data="rights"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="defaultChecked"
      :props="defaultProps">
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="RoleRightVisible = false">取 消</el-button>
      <el-button type="primary" @click.prevent="handleSubmit">确 定</el-button>
  </div>
  </el-dialog>
</template>

<script>
import { getRightsList } from '@/api/right'
export default {
  name: 'EditRight',
  data () {
    return {
      RoleRightVisible: false,
      rights: [],
      defaultChecked: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods: {
    // 显示角色授权框
    showDialog (role) {
      this.RoleRightVisible = true
      this.loadRights()
    },

    // 加载所有权限列表
    async loadRights () {
      const { data, meta } = await getRightsList('tree')
      if (meta.status === 200) {
        this.rights = data
      }
    },
    getRights (roleRights) {
      const tmp = []
      roleRights.forEach(first => {
        first.children.forEach(second => {
          second.children.forEach(third => tmp.push(third.id))
        })
      })
      this.defaultChecked = tmp
    },

    // 提交角色授权
    async handleSubmit () {
      // 获取菜单树中用户选中的节点id
      // 提交给服务器
    }
  }
}
</script>

<style scoped>

</style>
