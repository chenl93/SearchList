<template>
  <div id="app">

    <queryPanel
      :list="list"
      :panelsTitle="panelsTitle"
      :queryFields="queryFieldArr"
      @filter="filter"
      >
    </queryPanel>

    <el-table
      :data="list.slice((pageNo-1) * pageSize, pageNo * pageSize)"
      border
      style="width: 80%; margin-top: 20px;">

      <el-table-column
        v-for="it in column"
        :key="it"
        :prop="it.prop"
        :label="it.name"
        width="160">
      </el-table-column>
      
    </el-table>
   
    <el-pagination
      style="width: 80%; margin-top: 20px;"
      layout="total, sizes, prev, pager, next"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChangeP"
      :current-page="pageNo"
      :pager-count="5"
      :page-sizes="[10,50,100,200,300]"
      :page-size="pageSize"
      :total="parseInt(list.length,10)">
    </el-pagination>
  </div>
</template>

<script>

import queryPanel from './components/queryPanel'

export default {
  name: 'app',
  components: {
    queryPanel
  },
  data(){
    return {
      list: [
        {
          empNo: 7369,
          ename: 'SMITH',
          job: 'CLERK',
          hireDate: '2021-1-1',
          sal: 800,
          comm: 200,
          deptNo: 20
        },
        {
          empNo: 7499,
          ename: 'ALLEN',
          job: 'SALESMAN',
          hireDate: '2021-1-1',
          sal: 1600,
          comm: 200,
          deptNo: 10
        },
        {
          empNo: 7521,
          ename: 'WARD',
          job: 'SALESMAN',
          hireDate: '2021-1-1',
          sal: 1250,
          comm: 200,
          deptNo: 30
        },
        {
          empNo: 7566,
          ename: 'JONES',
          job: 'MANAGER',
          hireDate: '2021-1-1',
          sal: 2970,
          comm: 200,
          deptNo: 10
        },
        {
          empNo: 7654,
          ename: 'MARTIN',
          job: 'SALESMAN',
          hireDate: '2021-1-1',
          sal: 1200,
          comm: 200,
          deptNo: 30
        },
        {
          empNo: 7698,
          ename: 'BLAKE',
          job: 'MANAGER',
          hireDate: '2021-1-1',
          sal: 2800,
          comm: 200,
          deptNo: 20
        },
        {
          empNo: 7782,
          ename: 'CLARK',
          job: 'MANAGER',
          hireDate: '2021-1-1',
          sal: 2400,
          comm: 200,
          deptNo: 20
        },
        {
          empNo: 7788,
          ename: 'SCOTT',
          job: 'ANALYST',
          hireDate: '2021-1-1',
          sal: 3000,
          comm: 200,
          deptNo: 20
        },
        {
          empNo: 7839,
          ename: 'KING',
          job: 'PRESIDENT',
          hireDate: '2021-1-1',
          sal: 5000,
          comm: 200,
          deptNo: 20
        },
        {
          empNo: 7844,
          ename: 'TURNER',
          job: 'SALESMAN',
          hireDate: '2021-1-1',
          sal: 1500,
          comm: 200,
          deptNo: 20
        },
        {
          empNo: 7876,
          ename: 'ADAMS',
          job: 'CLERK',
          hireDate: '2021-1-1',
          sal: 1100,
          comm: 200,
          deptNo: 20
        },
        {
          empNo: 7900,
          ename: 'JAMES',
          job: 'CLERK',
          hireDate: '2021-1-1',
          sal: 950,
          comm: 200,
          deptNo: 20
        },
        {
          empNo: 7902,
          ename: 'FORD',
          job: 'ANALYST',
          hireDate: '2021-1-1',
          sal: 3000,
          comm: 200,
          deptNo: 20
        },
        {
          empNo: 7934,
          ename: 'MILLER',
          job: 'CLERK',
          hireDate: '2021-1-1',
          sal: 1300,
          comm: 200,
          deptNo: 10
        },
      ],
      column: [
        {
          prop: 'empNo',
          name: 'EMPNO'
        },
        {
          prop: 'ename',
          name: 'ENAME'
        },
        {
          prop: 'job',
          name: 'JOB'
        },
        {
          prop: 'hireDate',
          name: 'HIREDATE'
        },
        {
          prop: 'sal',
          name: 'SAL'
        },
        {
          prop: 'comm',
          name: 'COMM'
        },
        {
          prop: 'deptNo',
          name: 'DEPTNO'
        }
      ],
      queryFieldArr: ['job', 'deptNo'],
      panelsTitle: ['JOB', 'DEPTNO'],
      pageSize: 10,
      pageNo: 1
    }
  },
  mounted() {
  },
  methods: {
    filter(res){
      this.list = res
    },

    handleSizeChange (val) {
      this.pageSize = val
    },

    handleCurrentChangeP(val) {
      this.pageNo = val
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
