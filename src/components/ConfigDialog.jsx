import { ElDialog ,ElButton,ElInput, ElSelect, ElOption} from "element-plus";
import { createVNode, defineComponent, reactive, ref, render } from "vue";

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
            width: '1000',
            height: '2000'
        },{
            name: '模板2',
            width: '2000',
            height: '2000'
        }]
        var options = reactive([{
            name: '模板1',
            value: '模板1'
        },{
            name: '模板2',
            value: '模板2'
        }])
        var models = reactive({
            value: ''
        })
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
            let name = models.value;
            console.log(name)
            let width = '';
            let height = '';
            for( let item of modelMap ) {
                if( name === item.name ) {
                    width = item['width'];
                    height = item['height'];
                }
            }
            state.option.onConfirm && state.option.onConfirm(width,height)
        }
        return (data)=>{
            return <ElDialog v-model={state.isShow} title={state.option.title}>
                {{
                    default:()=><ElSelect v-model={models.value}>
                        {options.map((item)=>{
                            return <ElOption label={item.name} value={item.value}></ElOption>
                        })}
                    </ElSelect>,
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