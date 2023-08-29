import { defineStore } from 'pinia';
import api from '../main';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

export const useNetworkDevicesStore = defineStore('networkDevices', {
    state: () => ({
        mikrotikData: [],
        syncClientData: [],
        syncPackageData: [],
        usersData: [],


    }),
    actions: {
        async fetchMikrotikData() {
            try {
                const response = await api.get('/mikrotik');
                this.mikrotikData = response.data;

                console.log(this.mikrotikData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },


        async addDevice(newDeviceData) {
            try {
                await api.post('/addMikrotik', newDeviceData);
                const $toast = useToast();
                $toast.success('Mikrotik added successfully!');
                await this.fetchMikrotikData(); // Fetch updated data after adding a new device
            } catch (error) {
                console.error('Error adding device:', error);
            }
        },
        async editDevice(deviceId, updatedDeviceData) {
            try {
                await api.put(`/updateMikrotik/${deviceId}`, updatedDeviceData);
                const $toast = useToast();
                $toast.success('Mikrotik updated successfully!');
                await this.fetchMikrotikData(); // Fetch updated data after editing a device
            } catch (error) {
                console.error('Error editing device:', error);
            }
        },

        async removeDevice(deviceId) {
            try {
                await api.delete(`/removeMikrotik/${deviceId}`); // Assuming you have an endpoint to delete a device
                const $toast = useToast();
                $toast.success('Mikrotik removed successfully!');
                this.mikrotikData = this.mikrotikData.filter((device) => device.id !== deviceId);
                await this.fetchMikrotikData(); // Fetch updated data after adding a new device
            } catch (error) {
                console.error('Error removing device:', error);
            }
        },

        async syncClient(routerId) {
            try {
                console.log(routerId);
                const response = await api.get(`/mikrotikSyncClient/${routerId}`);
                // console.log(response.data);

                this.syncClientData = response.data;

                // console.log(this.syncClientData);

                // Use the useToast function to show a toast notification
                const toast = useToast(); // Create a toast instance
                toast.success('Mikrotik Client synced successfully!'); // Show the success toast
            } catch (error) {
                console.error('Error syncing client:', error);
            }
        },


        async syncPackage(routerId) {
            try {
                console.log(routerId);
                const response = await api.get(`/mikrotikSyncPackage/${routerId}`);
                this.syncPackageData = response.data;
                // console.log(this.syncPackageData);

                // Use the useToast function to show a toast notification
                const toast = useToast(); // Create a toast instance
                toast.success('Mikrotik package synced successfully!'); // Show the success toast
            } catch (error) {
                console.error('Error syncing client:', error);
            }
        },


        async mikrotikPackage(routerId) {
            try {
                const response = await api.get(`/mikrotikPackage/${routerId}`);
                this.syncPackageData = response.data;
                // console.log(this.syncPackageData);

            } catch (error) {
                console.error('Error syncing client:', error);
            }
        },

        async mikrotikPackageEdit(editedPackageId, routerId, updatedPackageData) {
            try {
                console.log(updatedPackageData);
                await api.put(`/updateSyncPackage/${editedPackageId}`, updatedPackageData);
                const $toast = useToast();
                $toast.success('Mikrotik package updated successfully!');

                // Fetch updated data after editing a package
                await this.mikrotikPackage(routerId);
            } catch (error) {
                console.error('Error updating package:', error);
            }
        },



        async removeSyncPackage(routerId) {
            try {
                await api.delete(`/removeSyncPackage/${routerId}`);
                const $toast = useToast();
                $toast.success('Mikrotik package removed successfully!');

                console.log(this.syncPackageData);

                // Filter out the removed package using a new array
                this.syncPackageData = this.syncPackageData.filter((packages) => packages._id !== routerId);
                console.log(this.syncPackageData);
            } catch (error) {
                console.error('Error removing package:', error);
            }
        },




        async fetchUsersData() {
            try {
                const response = await api.get('/pppoeUsers');
                this.usersData = response.data;

                console.log(this.usersData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },


        async removePPPoEuser(deviceId) {
            try {
                await api.delete(`/removePPPoEuser/${deviceId}`); // Assuming you have an endpoint to delete a device
                const $toast = useToast();
                $toast.success('User removed successfully!');
                this.usersData = this.usersData.filter((device) => device.id !== deviceId);
                await this.fetchUsersData(); // Fetch updated data after adding a new device
            } catch (error) {
                console.error('Error removing device:', error);
            }
        },

    },
});
