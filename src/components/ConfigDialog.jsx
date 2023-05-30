import { ElDialog ,ElButton,ElInput, ElSelect, ElOption} from "element-plus";
import { createVNode, defineComponent, reactive, ref, render } from "vue";
import $http from '../http'

const ConfigDialog = defineComponent({
    props:{
        option:{type:Object}
    },
    setup(props,ctx){
        const state = reactive({
            option:props.option, // 用户给组件的属性
            isShow:false
        })
        var modelMap = [{
            name: '模板1',
            json: ''
        },{
            name: '模板2',
            json: ''
        }]
        var options = reactive([{
            name: '配置1',
            value: '{"container":{"width":1000,"height":1000},"blocks":[{"top":209.5,"left":357,"zIndex":1,"key":"text","alignCenter":false,"props":{},"model":{},"width":64,"height":21,"focus":false},{"top":198.5,"left":445,"zIndex":1,"key":"select","alignCenter":false,"props":{},"model":{},"width":214,"height":32,"focus":true}]}'
        },{
            name: '配置2',
            value: '{"container":{"width":1000,"height":1000},"blocks":[{"top":209.5,"left":357,"zIndex":1,"key":"text","alignCenter":false,"props":{},"model":{},"width":64,"height":21,"focus":false},{"top":198.5,"left":445,"zIndex":1,"key":"select","alignCenter":false,"props":{},"model":{},"width":214,"height":32,"focus":false},{"top":283.5,"left":412,"zIndex":1,"key":"text","alignCenter":false,"props":{},"model":{},"width":64,"height":21,"focus":false}]}'
        }])
        async function getConfigurations() {
            console.log($http)
            let res = await $http.get(`/rest/configurations`);
            console.log(res.data)
            modelMap = res.data;
            options = [];
            modelMap.map((item)=>{
                options.push({'name':item.name,'value':item.json})
            })
            console.log(modelMap)
            console.log(options)
        }
        
        getConfigurations()
        var models = reactive({
            value: ''
        })
        var describe = ref('')
        ctx.expose({ // 让外界可以调用组件的方法
            showDialog(option){
                state.option = option;
                state.isShow = true;
            }
        });
        const onCancel = () =>{
            state.isShow = false;
        }
        const onConfirm = ()=>{
            state.isShow = false;
            state.option.onConfirm && state.option.onConfirm(models.value)
        }
        const onChange = (e)=>{
            modelMap.map((item)=>{
                if( item.json === e ) {
                    describe = item.describe
                }
            })
        }
        return (data)=>{
            return <ElDialog v-model={state.isShow} title={state.option.title}>
                {{
                    default:()=><div>模板：<ElSelect onChange={onChange} v-model={models.value}>
                        {options.map((item)=>{
                            return <ElOption label={item.name} value={item.value}></ElOption>
                        })}
                    </ElSelect><br></br>描述：<ElInput type="textarea" placeholder="请选择配置" rows="10" v-model={describe} disabled="true"></ElInput></div>,
                    footer:()=>state.option.footer&& <div>
                        <ElButton onClick={onCancel}>取消</ElButton>
                        <ElButton type="primary"  onClick={onConfirm}>确定</ElButton>
                    </div>
                }}
            </ElDialog>
        }
    }   
})
let vm;
export function $configDialog(option){                                            
    // element-plus中是有el-dialog组件 
    // 手动挂载组件   new SubComponent.$mount()
    if(!vm){
        let el = document.createElement('div');
        vm = createVNode(ConfigDialog,{option}); // 将组件渲染成虚拟节点
    
        // 这里需要将el 渲染到我们的页面中
        document.body.appendChild((render(vm,el),el)) // 渲染成真实节点扔到页面中
    }
    // 将组件渲染到这个el元素上
    let {showDialog} = vm.component.exposed
    showDialog(option); // 其他说明组件已经有了只需要显示出来即可
}