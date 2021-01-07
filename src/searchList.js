class SearchList {

  /**
   * Creates an instance of SearchList.
   * @param {*} data 筛选的数据
   * @param {*} queryField 筛选的字段
   * @memberof SearchList
   */
  constructor(data, queryFields) {
    this.data = data
    this.queryFields = queryFields
    
    this.queryPanels = []
    this.resultList = data

    this.init()
  }

  /**
   *
   * 初始化panel
   * @memberof SearchList
   */
  init() {
    this._getPueryPanel(this.data)
  }

  /**
   * 
   * 筛选数据方法
   * @param {*} fields 所有panel已勾选选项
   * @param {*} index 当前操作的panel的索引
   * @return {*} 
   * @memberof SearchList
   */
  filterFun(fields, index){
    if (fields.length == 0) {
      this.resultList = this.data
      return this.resetFun()
    }
    let res = this.resultList.filter(it => {
      let flag = false
      fields.forEach(ele => {
        if (ele === it[this.queryFields[index]]) flag = true
      })
      return flag
    })

    this.queryPanels = []
    this.resultList = res
    this._getPueryPanel(this.resultList)

    return res
  }

  /**
   *
   * 重置panel
   * @return {*} 
   * @memberof SearchList
   */
  resetFun(){
    this.queryPanels = []
    this._getPueryPanel(this.data)
    return this.data
  }

  /**
   *
   * 将panel中的选项筛选出来
   * @param {*} list 
   * @memberof SearchList
   */
  _getPueryPanel(list) {
    this.queryFields.forEach(it => {
      this.queryPanels.push([])
    })

    list.forEach(it => {
      this.queryFields.forEach((ele, i) => {
        if(it[ele]){
          this.queryPanels[i].push(it[ele])
        }
      })
    })

    this.queryPanels.forEach((it, i) => {
      this.queryPanels[i] = [...new Set(this.queryPanels[i])]
    })
  }
}

export default SearchList


