import { User, Bell, Wifi, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';
import { Separator } from './ui/separator';

export function SettingsPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      <Navbar onNavigate={onNavigate} />
      <div className="flex">
        <Sidebar currentPage="settings" onNavigate={onNavigate} />
        <main className="flex-1 p-6 lg:p-8 max-w-[1440px] mx-auto w-full">
          <h1 className="text-[#1C8C36] mb-8">Settings</h1>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="profile">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="offline">
                <Wifi className="h-4 w-4 mr-2" />
                Offline Mode
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1C8C36]">Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 234 567 8900" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Farm Location</Label>
                    <Input id="location" defaultValue="California, USA" />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <Button className="bg-[#1C8C36] hover:bg-[#1C8C36]/90">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1C8C36]">App Preferences</CardTitle>
                  <CardDescription>
                    Customize how the app works for you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Language</Label>
                      <p className="text-[#4B5563]">
                        Choose your preferred language
                      </p>
                    </div>
                    <select className="border rounded-lg px-3 py-2 text-[#1C8C36]">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>Hindi</option>
                    </select>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-save diagnoses</Label>
                      <p className="text-[#4B5563]">
                        Automatically save all diagnosis results
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>High-quality images</Label>
                      <p className="text-[#4B5563]">
                        Use high resolution for better diagnosis
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dark mode</Label>
                      <p className="text-[#4B5563]">
                        Switch to dark theme
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1C8C36]">Notification Settings</CardTitle>
                  <CardDescription>
                    Manage how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email notifications</Label>
                      <p className="text-[#4B5563]">
                        Receive diagnosis results via email
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push notifications</Label>
                      <p className="text-[#4B5563]">
                        Get alerts on your device
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weather alerts</Label>
                      <p className="text-[#4B5563]">
                        Alerts for disease-favorable conditions
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weekly summary</Label>
                      <p className="text-[#4B5563]">
                        Get a weekly crop health report
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Treatment reminders</Label>
                      <p className="text-[#4B5563]">
                        Remind me about scheduled treatments
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Offline Mode Tab */}
            <TabsContent value="offline">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1C8C36]">Offline Mode</CardTitle>
                  <CardDescription>
                    Manage offline database and diagnostics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable offline mode</Label>
                      <p className="text-[#4B5563]">
                        Diagnose without internet connection
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <Label>Downloaded disease databases</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-[#F9FAF9] rounded-lg">
                        <div>
                          <p className="text-[#1C8C36]">Tomato Diseases</p>
                          <p className="text-[#4B5563]">45 MB • Last updated: Nov 1, 2025</p>
                        </div>
                        <Button variant="outline" size="sm">Update</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-[#F9FAF9] rounded-lg">
                        <div>
                          <p className="text-[#1C8C36]">Wheat Diseases</p>
                          <p className="text-[#4B5563]">38 MB • Last updated: Oct 28, 2025</p>
                        </div>
                        <Button variant="outline" size="sm">Update</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-[#F9FAF9] rounded-lg">
                        <div>
                          <p className="text-[#1C8C36]">Corn Diseases</p>
                          <p className="text-[#4B5563]">52 MB • Last updated: Oct 25, 2025</p>
                        </div>
                        <Button variant="outline" size="sm">Update</Button>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <Button className="bg-[#1C8C36] hover:bg-[#1C8C36]/90">
                    Download All Updates
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Logout Section */}
          <Card className="mt-8 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="destructive"
                onClick={() => onNavigate('landing')}
                className="w-full sm:w-auto"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}