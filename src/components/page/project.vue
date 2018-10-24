<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 项目管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                	<el-form :inline="true" :model="searchFrom" ref="searchFrom" label-width="90px">
                        <el-form-item>
                            <el-input v-model="searchFrom.title"  placeholder="活动标题"></el-input>
                        </el-form-item>
                        <el-form-item>
                             <el-date-picker
                            v-model="searchFrom.startTime"
                            type="date"
                            placeholder="开始日期">
                            </el-date-picker>
                        </el-form-item>
                         <el-form-item>
                             <el-date-picker
                            v-model="searchFrom.endTime"
                            type="date"
                            placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-button type="primary" icon="search" @click="search">搜索</el-button>
                    </el-form>
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="batchDeleteRecord">删除</el-button>
                    <el-button type="primary" icon="delete" class="handle-del mr10" @click="hadleAdd">添加</el-button>    
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="title" label="活动标题" sortable width="150">
                </el-table-column>
                <el-table-column prop="price" label="价格" width="120">
                </el-table-column>
                 <el-table-column prop="discountprice" label="推荐奖励" width="120">
                </el-table-column>
                <el-table-column prop="titlePic" label="海报地址" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="smallPic" label="海报小图" :formatter="formatter">
                </el-table-column>
                <el-table-column prop="detailDesc" label="详情" :formatter="formatter">
                </el-table-column>
                <el-table-column label="操作" width="120" align="center"   fixed="right">
                    <template slot-scope="scope ">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

         <!-- 添加弹出框 -->
        <el-dialog title="添加" :visible.sync="addVisible" width="30%">
            <el-form ref="addForm" :model="addForm" label-width="50px">
                <el-form-item label="标题">
                    <el-input v-model="addForm.title"></el-input>
                </el-form-item>
                 <el-form-item label="价格">
                    <el-input v-model="addForm.price"></el-input>
                </el-form-item>
                 <el-form-item label="奖励">
                    <el-input v-model="addForm.discountprice"></el-input>
                </el-form-item>
                <el-form-item label="开始">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                  <el-form-item label="结束">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                  <el-form-item label="海报">
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handleSucc"
                    :file-list="fileList"
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { queryProject } from '../../service/getData'
    import { baseUrl } from '../../../config/env'
    export default {
        name: 'basetable',
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                total:0,
                pageIndex:1,
                pageSize:10,
                titlePicAction:baseUrl+'home/project',
                multipleSelection: [],
                fileList: [],   
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                addVisible:false,
                addForm:{
                    title:'',
                    startTime:'',
                    endTime:'',
                },
                searchFrom:{
                    status:'',
                    title:'',
                    startTime:'',
                    endTime:'',
                },
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1
            }
        },
        created() {
            //this.getData();
            this.getProject();
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                   /* let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.titlePic.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }*/
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getProject();
            },
            async getProject(){
                try{
                var projectRet = await queryProject(this.pageIndex, this.pageSize);
                if(projectRet.code == '0'){
                    this.tableData = projectRet.data.projectList;
                    this.total = projectRet.data.count;
                }
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
           /* getData() {
                this.url = '/home/project';
                this.$axios.get(this.url, {
                    params:{
                        pageIndex: this.pageIndex,
                        pageSize: this.pageSize,
                    }
                }).then((res) => {
                    console.log(res.data.data)
                    
                })
            },*/
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            hadleAdd(){
                this.addVisible = true;
            },
            handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            batchDeleteRecord() {
                const length = this.multipleSelection.length;
                if(length == 0){
                    this.$message.error('请先选择要删除的记录');
                    return;
                }
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            },
            /*上传文件 */
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log("ssss",file);
            },
            handleSucc(response,files, fileList) {
                console.log(response,files,fileList);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            saveAdd(){
                console.log(this.fileList)
            }
        }
    }

</script>

<style scoped>
    .search_btn{
        text-align: right;
    }
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 100px;
    }

    .handle-input {
        width: 150px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
</style>
