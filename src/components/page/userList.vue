<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-group"></i> 用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                    <el-autocomplete
                    v-model="state4"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="用户手机号"
                    @select="handleSelect"
                    ></el-autocomplete>
                    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click="addManager">创建管理员</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="headimgurl" label="头像" width="150">
                    <template slot-scope="scope">
                        <img  :src="scope.row.headimgurl" alt="" class="user_headimgurl">
                    </template>
                </el-table-column>
                <el-table-column prop="realname" label="真实姓名" width="120">
                </el-table-column>
                <el-table-column prop="nickname" label="昵称" width="120">
                </el-table-column>
                <el-table-column prop="phoneNumber" label="手机号" width="120">
                </el-table-column>
                 <el-table-column prop="createTime" label="创建时间"  sortable :formatter="timeFormatter">
                </el-table-column>
                <el-table-column label="操作" width="200" align="center"   fixed="right">
                    <template slot-scope="scope ">
                        <el-button type="text" icon="el-icon-view" @click="handleEdit(scope.$index, scope.row)">查看保险信息</el-button>
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
       
          <!--创建管理员 -->
        <el-dialog title="创建管理员" :visible.sync="addVisible"  width="30%">
            <el-form :model="addMgrForm" :rules="addMgrrules" ref="addMgrForm" label-width="0px" class="ms-content">
                <el-form-item prop="phone">
                    <el-input v-model="addMgrForm.phone" placeholder="手机号">
                        <el-button slot="prepend" icon="el-icon-phone"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="addMgrForm.password" @keyup.enter.native="submitForm('addMgrForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                 <el-button  @click="addVisible = false">取消</el-button>
                <el-button type="primary" @click="saveAddMamager('addMgrForm')">注册账户</el-button>
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
    import { queryUser, mgrRegister } from '../../service/getData'
    import { baseUrl } from '../../../config/env'
    export default {
        name: 'basetable',
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                total:0,
                pageIndex:1,
                pageSize:5,
                radio:1,
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
                phoneList: [],
                state4: '',
                timeout:  null,
                addMgrForm:{
                    phone:'',
                    password:'',
                },
                 addMgrrules: {
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                searchFrom:{
                    phone:'',
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
            this.getUserList();
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
                this.getUserList();
            },
            async getUserList(){
                try{
                var userListRet = await queryUser(this.pageIndex, this.pageSize, this.searchFrom.phone);
                if(userListRet.code == '0'){
                    this.tableData = userListRet.data;
                    //this.total = userListRet.data.count;
                    this.total = 21;
                }
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
             timeFormatter(row, column) {
                 if(row.createTime){
                     return row.createTime.substr(0,10)
                 }else{
                      return row.createTime;
                 }
                
            },
            async getPhoneList(queryString){
                var userListRet = await queryUser(1, 10,queryString);
                if(userListRet.code == '0'){
                    var tempData  = userListRet.data;
                    var retArr = [];
                    for(var i=0;i<tempData.length;i++){
                        retArr.push({'value':`${tempData[i].phoneNumber}(${tempData[i].nickname})`,"id":tempData[i].userId})
                    }
                }
                this.phoneList = retArr;
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
            filterTag(value, row) {
                return row.tag === value;
            },
            querySearchAsync(queryString, cb) {
                var phoneList = this.phoneList;
                //var results = queryString ? phoneList.filter(this.createStateFilter(queryString)) : phoneList;
                var results = this.getPhoneList(queryString);
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                cb(this.phoneList);
                }, 3000 * Math.random());
            },
            createStateFilter(queryString) {
                return (state) => {
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
             handleSelect(item) {
                console.log(item);
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
            addManager(){
                this.addVisible = true;
            },
            saveAddMamager(formName){
                console.log(this.$refs[formName])
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.register();
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
                
            },
            async register(){
                var regRet = await mgrRegister(this.addMgrForm.phone,this.addMgrForm.password, 1);
                this.$message(regRet.message);
                if(regRet.code == '0'){
                    this.addVisible = false;
                }
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
        },
         mounted() {
            //this.phoneList = this.loadAll();
            this.phoneList = this.getPhoneList();
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
    .user_headimgurl{
        height: 50px;
        width: 50px;
        border-radius: 50%;
    }
</style>
