import { ElMessageBox } from "element-plus"

export const messageSuccess = async () => {
    let src = (await import("@/assets/img/personal/flyingBird.webp")).default
    ElMessageBox.alert(
        `
        <div  style=" display: flex; align-items: center ; justify-content: center;">
        <strong><spen style="    padding: 10px; font: italic bold 24px '楷体';">更新成功</spen></strong> 
        <div style=" width: 200px; height: 100px; background-image: url(${src}); background-size: 100% 100%;"></div>
       
        </div> 
        `,
        'Prompt Message',
        {
            dangerouslyUseHTMLString: true,
            showConfirmButton : false,
            closeOnClickModal : true,
        }
    )
}