<template>
  <div class="queryPanel">
    <div class="queryPanelWrapper" v-for="(it,index) in queryPanels" :key="index">
      <div class="panelTitleWrapper">
        <label class="panelTitle" for="">{{panelsTitle[index]}}</label>
        <i class="searchBtn el-icon-search" @click="searchFun(index)"></i>
      </div>
      <div class="checkboxWrapper">
        <el-scrollbar style="height: 100%;">
          <el-checkbox-group v-model="checkedFields[index]" class="checkboxGroup" >
            <el-checkbox class="checkboxItem" v-for="(ele, i) in it" :label="ele" :key="i">{{ele}}</el-checkbox>
          </el-checkbox-group>
        </el-scrollbar>
      </div>
    </div>
    <el-button @click="resetFun">Reset</el-button>
  </div>
</template>

<script>
import SearchList from '../searchList.js'

export default {
  name: 'queryPanel',
  props: {
    list: {
      type: Array,
      default: []
    },
    panelsTitle: {
      type: Array,
      default: []
    },
    queryFields: {
      type: Array,
      default: []
    },
  },
  data () {
    return {
      checkedFields: [],
      queryPanels: [],
      searchList: {}
    }
  },
  methods: {
    searchFun(index){
      let res = this.searchList.filterFun(this.checkedFields[index], index)
      this.queryPanels = this.searchList.queryPanels
      if(this.checkedFields[index] == 0){
        this.checkedFields.forEach((it, i) => {
          this.checkedFields[i] = []
        })
      }
      this.$emit("filter", res)
    },

    resetFun(){
      let res = this.searchList.resetFun()
      this.queryPanels = this.searchList.queryPanels
      this.$emit("filter", res)

      this.checkedFields.forEach((it, i) => {
        this.checkedFields[i] = []
      })
    }
  },
  mounted() {
    this.searchList = new SearchList(this.list, this.queryFields)
    this.queryPanels = this.searchList.queryPanels

    this.queryFields.forEach((it, index) => {
      this.checkedFields[index] = []
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  /deep/.queryPanel{
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;

    .queryPanelWrapper{
      margin-right: 20px;
      border: 1px solid #eee;
    }

    .checkboxWrapper{
      height: 96px;
    }

    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    
    .panelTitleWrapper{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 30px;
      line-height: 30px;
      background-color: teal;
      color: #fff;
      .panelTitle{
        padding-left: 10px;
      }
      .searchBtn{
        display: flex;
        justify-content: center;
        align-items: center;
        padding-right: 10px;
        cursor: pointer;
      }
    }

    .checkboxGroup{
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      min-width: 180px;
      padding-left: 10px;
      .checkboxItem{
        height: 30px;
        line-height: 30px;
      }
    }
    
  }
</style>
