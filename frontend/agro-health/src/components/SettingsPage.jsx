import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { User, Settings, Bell, Shield, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Hamburger } from "../Hamburger";
import { Separator } from "./ui/separator";

// New function signature
export function SettingsPage({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [currentPassInput, setCurrentPassInput] = useState("");
  const [newPassInput, setNewPassInput] = useState("");
  const [confirmPassInput, setConfirmPassInput] = useState("");

  // empty formData, filled by fetch
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    state: "",
    location: "",
  });

  // fetch user data from backend on page load
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("https://agro-health.onrender.com/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setFormData({
          fullName: data.fullName || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          state: data.state || "",
          location: data.location || "",
        });
      }
    };
    fetchProfile();
  }, []);

  // save to chnages made to the User's backend data
  const handleSaveChanges = async () => {
    setIsSaving(true);
    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://agro-health.onrender.com/api/auth/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      },
    );
    const data = await res.json();
    setIsSaving(false);
    alert(res.ok ? "Profile saved!" : data.message || "Failed to save.");
  };

  // password update via backend
  const handleUpdatePassword = async () => {
    if (newPassInput !== confirmPassInput) {
      alert("Error: New passwords do not match.");
      return;
    }
    const token = localStorage.getItem("token");
    const res = await fetch(
      "https://agro-health.onrender.com/api/auth/change-password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: currentPassInput,
          newPassword: newPassInput,
        }),
      },
    );
    const data = await res.json();
    if (res.ok) {
      alert("Password updated successfully!");
      setCurrentPassInput("");
      setNewPassInput("");
      setConfirmPassInput("");
    } else {
      alert(data.message || "Failed to update password.");
    }
  };

  return (
    <Hamburger darkMode={darkMode} setDarkMode={setDarkMode}>
      <main className="flex-1 p-6 lg:p-8 max-w-[1440px] mx-auto w-full">
        <h1 className="text-[#1C8C36] text-3xl font-bold mb-8">Settings</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-[#1C8C36] p-1 rounded-xl">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-white data-[state=active]:text-[#1C8C36]"
            >
              <User className="h-4 w-4 mr-2" /> Profile
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-white data-[state=active]:text-[#1C8C36]"
            >
              <Shield className="h-4 w-4 mr-2" /> Security
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="data-[state=active]:bg-white data-[state=active]:text-[#1C8C36]"
            >
              <Settings className="h-4 w-4 mr-2" /> Preferences
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-white data-[state=active]:text-[#1C8C36]"
            >
              <Bell className="h-4 w-4 mr-2" /> Notifications
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1C8C36]">
                  Profile Information
                </CardTitle>
                <CardDescription>Update your account details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    disabled
                    className="opacity-60 bg-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Farm Location</Label>
                  <Input
                    id="location"
                    value={formData.farmLocation}
                    onChange={(e) =>
                      setFormData({ ...formData, farmLocation: e.target.value })
                    }
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
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1C8C36]">Security</CardTitle>
                <CardDescription>
                  Change your account password securely.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="curr-pass">Current Password</Label>
                  <Input
                    id="curr-pass"
                    type="password"
                    value={currentPassInput}
                    onChange={(e) => setCurrentPassInput(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-pass">New Password</Label>
                  <Input
                    id="new-pass"
                    type="password"
                    value={newPassInput}
                    onChange={(e) => setNewPassInput(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-pass">Confirm New Password</Label>
                  <Input
                    id="confirm-pass"
                    type="password"
                    value={confirmPassInput}
                    onChange={(e) => setConfirmPassInput(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleUpdatePassword}
                  className="bg-[#1C8C36] hover:bg-[#156d2a] text-white"
                >
                  Update Password
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1C8C36]">
                  App Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Language</Label>
                    <p className="text-[#4B5563] text-sm">
                      Choose your preferred language
                    </p>
                  </div>
                  <select className="border rounded-lg px-3 py-2 text-[#1C8C36]">
                    <option>English</option>
                    <option>Yoruba</option>
                    <option>Hausa</option>
                    <option>Igbo</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1C8C36]">
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email Notifications */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email notifications</Label>
                    <p className="text-[#4B5563] text-sm">
                      Receive diagnosis results via email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />

                {/* Push Notifications */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push notifications</Label>
                    <p className="text-[#4B5563] text-sm">
                      Get alerts on your device
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />

                {/* Weather Alerts */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weather alerts</Label>
                    <p className="text-[#4B5563] text-sm">
                      Alerts for disease-favorable conditions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />

                {/* Treatment Reminders */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Treatment reminders</Label>
                    <p className="text-[#4B5563] text-sm">
                      Remind me about scheduled treatments
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Danger Zone */}
        <Card className="mt-8 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              onClick={() => navigate("/login")}
              className="bg-[#e60000]"
            >
              <LogOut className="h-5 w-5 mr-2" /> Logout
            </Button>
          </CardContent>
        </Card>
      </main>
    </Hamburger>
  );
}
