import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Key, Save } from "lucide-react";

export const Profile = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setEmail(user.email);
      } else {
        navigate("/auth");
      }
    };
    getUser();
  }, [navigate]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Пароли не совпадают",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Пароль успешно изменен",
      });
      
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Профиль | Python с ИИ-учителем</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Профиль пользователя</h1>
            <p className="text-muted-foreground mt-2">{email}</p>
          </div>
          
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="newPassword">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Новый пароль
                </div>
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                "Сохранение..."
              ) : (
                <div className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Сохранить новый пароль
                </div>
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;