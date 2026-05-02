import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { User, Settings, Bell, Shield, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
// import { Navbar } from '../Navbar';
// import { Sidebar } from '../Sidebar';
import { Hamburger } from '../Hamburger';
import { Separator } from './ui/separator';

export function SettingsPage({ user = { 
  fullName: "Abdulwaasi Saliu", 
  email: "wasiu.saliu@miva.edu.ng", 
  phone: "08176453833", 
  state: "Lagos State", 
  farmLocation: "Surulere"
} }) {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [currentPassInput, setCurrentPassInput] = useState("");
  const [newPassInput, setNewPassInput] = useState("");
  const [confirmPassInput, setConfirmPassInput] = useState("");

  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    state: user.state,
    farmLocation: user.farmLocation
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleSaveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Profile changes implemented and saved automatically.");
    }, 800);
  };

  const handleUpdatePassword = () => {
    if (currentPassInput !== user.password) {
      alert("Error: Current password does not correspond to the account password.");
      return;
    }

    if (newPassInput !== confirmPassInput) {
      alert("Error: New passwords do not match.");
      return;
    }

    alert("Password updated successfully!");
    setCurrentPassInput("");
    setNewPassInput("");
    setConfirmPassInput("");
  };

  return (
    <Hamburger>
        <main className="flex-1 p-6 lg:p-8 max-w-[1440px] mx-auto w-full">
          <h1 className="text-[#1C8C36] text-3xl font-bold mb-8">Settings</h1>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-[#1C8C36] p-1 rounded-xl">
              <TabsTrigger value="profile" className="data-[state=active]:bg-white data-[state=active]:text-[#1C8C36]">
                <User className="h-4 w-4 mr-2" /> Profile
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-white data-[state=active]:text-[#1C8C36]">
                <Shield className="h-4 w-4 mr-2" /> Security
              </TabsTrigger>
              <TabsTrigger value="preferences" className="data-[state=active]:bg-white data-[state=active]:text-[#1C8C36]">
                <Settings className="h-4 w-4 mr-2" /> Preferences
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-white data-[state=active]:text-[#1C8C36]">
                <Bell className="h-4 w-4 mr-2" /> Notifications
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className={isDarkMode ? 'bg-[#1E1E1E] border-gray-700' : ''}>
                <CardHeader>
                  <CardTitle className="text-[#1C8C36]">Profile Information</CardTitle>
                  <CardDescription className={isDarkMode ? 'text-gray-400' : ''}>
                    Update your account details. Password settings have been moved to Security.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={formData.fullName} 
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className={isDarkMode ? 'bg-[#2D2D2D] border-gray-600' : ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={formData.email} disabled className="opacity-60 bg-gray-100 dark:bg-gray-800" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className={isDarkMode ? 'bg-[#2D2D2D] border-gray-600' : ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input 
                      id="state" 
                      placeholder="Enter your state"
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      className={isDarkMode ? 'bg-[#2D2D2D] border-gray-600' : ''}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Farm Location</Label>
                    <Input 
                      id="location" 
                      value={formData.farmLocation}
                      onChange={(e) => setFormData({...formData, farmLocation: e.target.value})}
                      className={isDarkMode ? 'bg-[#2D2D2D] border-gray-600' : ''}
                    />
                  </div>
                  <Button 
                    onClick={handleSaveChanges} 
                    className="bg-[#1C8C36] hover:bg-[#156d2a] text-white mt-4"
                    disabled={isSaving}
                  >
                    {isSaving ? "Implementing Changes..." : "Save Changes"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card className={isDarkMode ? 'bg-[#1E1E1E] border-gray-700' : ''}>
                <CardHeader>
                  <CardTitle className="text-[#1C8C36]">Security</CardTitle>
                  <CardDescription>Change your account password securely.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="curr-pass">Current Password</Label>
                    <Input 
                      id="curr-pass" 
                      type="password" 
                      value={currentPassInput}
                      onChange={(e) => setCurrentPassInput(e.target.value)}
                      className={isDarkMode ? 'bg-[#2D2D2D] border-gray-600' : ''} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-pass">New Password</Label>
                    <Input 
                      id="new-pass" 
                      type="password" 
                      value={newPassInput}
                      onChange={(e) => setNewPassInput(e.target.value)}
                      className={isDarkMode ? 'bg-[#2D2D2D] border-gray-600' : ''} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-pass">Confirm New Password</Label>
                    <Input 
                      id="confirm-pass" 
                      type="password" 
                      value={confirmPassInput}
                      onChange={(e) => setConfirmPassInput(e.target.value)}
                      className={isDarkMode ? 'bg-[#2D2D2D] border-gray-600' : ''} 
                    />
                  </div>
                  <Button onClick={handleUpdatePassword} className="bg-[#1C8C36] hover:bg-[#156d2a] text-white">
                    Update Password
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <Card className={isDarkMode ? 'bg-[#1E1E1E] border-gray-700' : ''}>
                <CardHeader>
                  <CardTitle className="text-[#1C8C36]">App Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Language</Label>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-[#4B5563]'}>Choose your preferred language</p>
                    </div>
                    <select className={`border rounded-lg px-3 py-2 ${isDarkMode ? 'bg-[#2D2D2D] border-gray-600' : 'text-[#1C8C36]'}`}>
                      <option>English</option>
                      <option>Yoruba</option>
                      <option>Hausa</option>
                      <option>Igbo</option>
                      <option>Arabic</option>
                      <option>French</option>
                      <option>Spanish</option>
                    </select>
                  </div>
                  <Separator className={isDarkMode ? 'bg-gray-700' : ''} />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dark mode</Label>
                      <p className={isDarkMode ? 'text-gray-400' : 'text-[#4B5563]'}>Switch between light and dark theme</p>
                    </div>
                    <Switch border-red-200
                      checked={isDarkMode} 
                      onCheckedChange={(checked) => setIsDarkMode(checked)} 
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab - Unchanged */}
            <TabsContent value="notifications">
               <Card className={isDarkMode ? 'bg-[#1E1E1E] border-gray-700' : ''}>
                <CardHeader><CardTitle className="text-[#1C8C36]">Notification Settings</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label>Email notifications</Label>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-[#4B5563]'}>
                      Receive diagnosis results via email
                    </p>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label>Push notifications</Label>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-[#4B5563]'}>
                      Get alerts on your device
                    </p>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label>Weather alerts</Label>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-[#4B5563]'}>
                      Alerts for disease-favorable conditions
                    </p>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label>Weekly summary</Label>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-[#4B5563]'}>
                      Get a weekly crop health report
                    </p>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label>Treatment reminders</Label>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-[#4B5563]'}>
                      Remind me about scheduled treatments
                    </p>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className={`mt-8 border-red-200 ${isDarkMode ? 'bg-[#1E1E1E] border-red-900/30' : ''}`}>
            <CardHeader><CardTitle className="text-red-600">Danger Zone</CardTitle></CardHeader>
            <CardContent>
              <Button variant="destructive" onClick={() => navigate('/login')} className="bg-[#e60000]">
                <LogOut className="h-5 w-5 mr-2" /> Logout
              </Button>
            </CardContent>
          </Card>
        </main>
      </Hamburger>
  );
}