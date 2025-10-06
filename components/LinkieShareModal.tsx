import { Copy, Facebook, Linkedin, Twitter, Whatsapp } from "lucide-react"; // 使用lucide-react图标库
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 假设这些是您的社交媒体图标组件（您可能需要自己准备或使用类似的图标）
const SocialIcon = ({ Icon, bgColor }) => (
  <Button variant="ghost" className={`p-0 h-12 w-12 rounded-full ${bgColor} hover:opacity-80 transition-opacity`}>
    <Icon className="h-6 w-6 text-white" />
  </Button>
);

export function LinkieShareModal({ open, onOpenChange }) {
  const link = "linkie.bio";

  // 社交图标数据（截图中有 WhatsApp, X (Twitter), LinkedIn, 还有几个需要自定义的）
  const socialMedia = [
    { Icon: Facebook, bgColor: "bg-blue-600" },
    { Icon: Whatsapp, bgColor: "bg-green-500" },
    { Icon: Twitter, bgColor: "bg-black" }, // X/Twitter图标
    { Icon: Linkedin, bgColor: "bg-blue-700" },
    // 假设用其他图标代替截图中的未知图标
    { Icon: Copy, bgColor: "bg-gray-600" },
    { Icon: Copy, bgColor: "bg-pink-600" },
    { Icon: Copy, bgColor: "bg-purple-600" },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    alert("链接已复制!");
  };

  return (
    // 使用 shadcn 的 Dialog 组件
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0 border-none bg-zinc-900 rounded-xl overflow-hidden shadow-2xl">
        <div className="flex flex-col items-center p-6 pb-4 bg-zinc-900">
          
          {/* 1. 顶部头像 (自定义样式) */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-800 p-1 mb-4">
            {/* 这里的图片应替换成实际的头像图片，这里用一个占位符 */}
            <div className="w-full h-full rounded-full bg-indigo-700 flex items-center justify-center">
              <span className="text-3xl font-bold text-white">L</span> 
            </div>
          </div>
          
          {/* 2. 标题 */}
          <DialogHeader className="w-full text-center">
            <DialogTitle className="text-2xl font-bold text-white mb-6">
              Share your Linkie
            </DialogTitle>
          </DialogHeader>

          {/* 3. 链接输入框及复制按钮 */}
          <div className="flex w-full space-x-2 mb-6">
            <div className="relative flex-grow">
                {/* 使用 Input 模拟截图中的样式 */}
                <Input 
                    value={link} 
                    readOnly 
                    className="h-10 text-white bg-zinc-800 border-none px-4 text-base focus-visible:ring-0" 
                />
            </div>
            <Button 
                onClick={handleCopy}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg h-10 w-20"
            >
                Copy
            </Button>
          </div>
          
          {/* 4. 社交媒体分享图标列表 */}
          <p className="text-sm text-gray-400 mb-4 self-start">Share on socials</p>
          <div className="flex w-full justify-between space-x-2">
            {socialMedia.map((social, index) => (
              <SocialIcon key={index} Icon={social.Icon} bgColor={social.bgColor} />
            ))}
          </div>

        </div>
        
        {/* 5. 底部卡片式推荐 */}
        <div className="p-6 pt-4 bg-black border-t border-zinc-800/50">
            <h3 className="text-xl font-bold text-white mb-2">
                Create your free Linkie
            </h3>
            <p className="text-sm text-gray-400 mb-4">
                Showcase all your important links in one place.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full h-10 rounded-lg">
                Create Linkie
            </Button>
        </div>

        {/* 6. 关闭按钮（shadcn/ui 的 DialogContent 会自动添加，但需要确保样式在暗色模式下可见） */}
        <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
             <span className="sr-only">Close</span>
             {/* 可以使用自定义的 X 按钮来匹配截图中的白色 X */}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// 如何使用:
// function Page() {
//   const [isOpen, setIsOpen] = React.useState(true); // 示例：默认打开
//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-900">
//       <LinkieShareModal open={isOpen} onOpenChange={setIsOpen} />
//     </div>
//   );
// }