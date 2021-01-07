class SearchClass {
  constructor(data, filterField, sort) {

    this.data = data
    this.sourceData = data.concat()
    this.sort = sort

    this.filterField = filterField
    this.filterArr = []
    this.modelArr = []
    this.init()
  }
  init(){
    this._initFilterArr()
    this._getFilterArr(this.data)
  }

  filter(val, i){
    if (val.length === 0) return this.reset()
    let res = this.data.filter(it => {
      let flag = false
      val.forEach(item => {
        if (item == it[this.filterField[i]]) flag = true
      })
      return flag
    })
    // 根据搜索结果将其他的checkbox组中的数据进行过滤
    this._setFilterArr(res, i)
    
    return res
  }


  reset(){
    this.filterArr = []
    this.modelArr = []

    this._initFilterArr()
    this._getFilterArr(this.sourceData)
    
    return this.sourceData
  }

  getFilterArr() {
    return this.filterArr
  }

  getModelArr(){
    return this.modelArr
  }

  _initFilterArr(){
    if (this.filterField && this.filterField.length > 0) {
      this.filterField.forEach((ele, i) => {
        this.filterArr.push([])
      })
    }
  }

  _getFilterArr(list){
    if (list && list.length > 0) {
      list.forEach(it => {
        this.filterField.forEach((ele, i) => {
          if (it[ele]) {
            this.filterArr[i].push(it[ele])
          }
        })
      })
    }

    if (this.filterArr && this.filterArr.length > 0) {
      for (let i = 0; i < this.filterArr.length; i++) {
        this.filterArr[i] = [...new Set(this.filterArr[i])]

        if (this.sort && this.sort[this.filterField[i]]) {
          this.filterArr[i].sort((x, y) => {
            return this.sort[this.filterField[i]][x] - this.sort[this.filterField[i]][y]
          })
        }

        this.modelArr.push({
          type: "checkbox",
          titleField: this.filterField[i] + 'All',
          field: this.filterField[i],
          data: this.filterArr[i],
          noLabel: true,
        })
      }
    }
  }

  _setFilterArr(list, cur) {
    // 清空除当前选项组以外的其他选项组的内容
    if (cur != -1) {
      this.filterArr.forEach((it, i) => {
        if (cur != i) {
          this.filterArr[i].splice(0, this.filterArr[i].length)
          this.modelArr[i] = {}
        }
      })

      if (list && list.length > 0) {
        list.forEach(it => {
          this.filterField.forEach((ele, i) => {
            if (cur != i) {
              this.filterArr[i].push(it[ele])
            }
          })
        })
      }
      if (this.filterArr && this.filterArr.length > 0) {
        for (let i = 0; i < this.filterArr.length; i++) {
          if (cur != i) {
            this.filterArr[i] = [...new Set(this.filterArr[i])]

            if (this.sort && this.sort[this.filterField[i]]) {
              this.filterArr[i].sort((x, y) => {
                return this.sort[this.filterField[i]][x] - this.sort[this.filterField[i]][y]
              })
            }

            this.modelArr[i] = ({
              type: "checkbox",
              titleField: this.filterField[i] + 'All',
              field: this.filterField[i],
              data: this.filterArr[i],
              noLabel: true,
            })
          }
        }
      }
    }
  }
  
}

export default SearchClass