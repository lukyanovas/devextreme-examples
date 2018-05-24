<template>
  <div>
    <h2>Dialogs and notifications</h2>
    <div class="images">
        <div v-for="house in houses" :key="house.ID">
            <div @click="showHouse(house)" class="item-content">
                <img :src="house.Image" />
                <div class="item-options">
                    <div>
                        <div class="address">{{house.Address}}</div>
                        <div class="price large-text">{{ house.Price | currency }}</div>
                        <div class="agent">
                            <div :id="'house' + house.ID">
                                <img src="images/icon-agent.svg">
                                Listing agent
                            </div>
                        </div>
                    </div>
                </div>
                <dx-popover
                    showEvent="mouseenter"
                    hideEvent="mouseleave"
                    contentTemplate="popoverContent"
                    :position="position"
                    :target="'#house' + house.ID" 
                    :width="260">
                    <div slot="popoverContent" slot-scope="data">
                        <div class="agent-details">
                            <img :src="house.Agent.Picture" />
                            <div>
                                <div class="name large-text">{{house.Agent.Name}}</div>
                                <div class="phone">Tel: {{house.Agent.Phone}}</div>
                            </div>
                        </div>
                    </div>
                </dx-popover>
            </div>
        </div>

        <dx-popup
            :width="660"
            :height="540"
            :showTitle="true"
            :title="currentHouse.Address"
            :dragEnabled="false"
            :closeOnOutsideClick="true"
            :visible.sync="popupVisible">
            <div slot="content" slot-scope="data">
                <div class='popup-property-details'>
                    <div class='large-text'>{{currentHouse.Price | currency}}</div>
                    <div class='opacity'>{{currentHouse.Address}}, {{currentHouse.City}}, {{currentHouse.State}}</div>
                    <dx-button
                        class="favorites"
                        icon="favorites"
                        :text="favoriteText"
                        :width="210"
                        :height="44"
                        @click="changeFavoriteState">
                    </dx-button>
                    <div class='images'>
                        <img :src="currentHouse.Image" />
                        <img :src="currentHouse.Image.replace('.jpg', 'b.jpg')" />
                    </div>
                    <div>{{currentHouse.Features}}</div>
                </div>
            </div>
        </dx-popup>
    </div>
    <br />
  </div>  
</template>

<script>
import notify from 'devextreme/ui/notify';

import { DxButton } from "devextreme-vue/ui/button";
import { DxPopup } from "devextreme-vue/ui/popup";
import { DxPopover } from "devextreme-vue/ui/popover";

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

const     
    ADD_TO_FAVORITES = "Add to Favorites",
    REMOVE_FROM_FAVORITES = "Remove from Favorites";

export default {
  components: {
    DxButton,
    DxPopup,
    DxPopover
  },
  filters: {
      currency(val) {
        return currencyFormatter.format(val);
      }
  },
  computed: {
      favoriteText() {
          return this.currentHouse.Favorite ? REMOVE_FROM_FAVORITES : ADD_TO_FAVORITES
      }
  },
  methods: {
      showHouse(house) {
        this.currentHouse = house;
        this.popupVisible = true;
      },
      changeFavoriteState() {
        let favoriteState = !this.currentHouse.Favorite;
        let message = "This item has been "
                + (favoriteState ? "added to" : "removed from")
                + " the Favorites list!";
        this.currentHouse.Favorite = favoriteState;

        notify({
                message: message,
                width: 450
            }, 
            favoriteState ? "success" : "error",  2000
        );   
      }
  },
  data: function() {
    return {
        houses: housesSource,
        currentHouse: housesSource[0],
        popupVisible: false,
        position: {
            offset: '0, 2',
            at: 'bottom',
            my: 'top',
            collision: 'fit flip'
        }
    };
  }
};

//data.js
var housesSource = [{
        ID: "1",
        Favorite: false,
        Address: "652 Avonwick Gate",
        City: "Toronto",
        State: "ON",
        ZipCode: "M3A25",
        Beds: "4",
        Baths: "4",
        HouseSize: 7500,
        LotSize: "0.8",
        Price: 780000,
        Coordinates: "43.7507639, -79.3184378",
        Features: "Dishwasher, Disposal, Separate laundry room, 3/4 bath downstairs, Formal dining room, Downstairs family room, Separate family room, Breakfast Bar/Counter, Breakfast nook (eating area), Granite countertops in kitchen, Hardwood flooring in kitchen, Kitchen island, Solid surface countertops in kitchen, Entry foyer, Front living room, Ceiling fan in master bedroom, Master bedroom separate from other, Mirrored door closet in master bedroom, 2nd bedroom: 11x13, 3rd bedroom: 11x14, 4th Bedroom: 18x13, Alarm system owned, Built-in microwave, Carpet, Ceiling fan(s), Convection oven, Double built-in gas ovens, Gas cooktop, Gas stove, Marble/Stone floors",
        YearBuilt: "2008",
        Type: "0",
        Status: "1",
        Image: "images/gallery/1.jpg",
        Agent: {
            Name: "John Heart",
            Phone: "(213) 555-9392",
            Picture: "images/employees/01.png"
        }
    },
    {
        ID: "2",
        Favorite: false,
        Address: "82649 Topeka St",
        City: "Riverbank",
        State: "CA",
        ZipCode: "95360",
        Beds: "5",
        Baths: "3",
        HouseSize: 12500,
        LotSize: "1.2",
        Price: 1750000,
        Coordinates: "37.7369999,-120.9430488",
        Features: "Dishwasher, Disposal, Separate laundry room, Full bath downstairs, Formal dining room, Downstairs family room, Separate family room, Breakfast Bar/Counter, Breakfast nook (eating area), Granite countertops in kitchen, Kitchen custom cabinets, Kitchen island, Pantry, Walk-in pantry, Entry foyer, Formal living room, Rear living room, Vaulted ceiling in living room, Balcony in master bedroom, Master bedroom separate from other, Master bedroom upstairs, Sitting room in master bedroom, Walk-in closet in master bedroom, 2nd bedroom: 13X20, 3rd bedroom: 13X17, 4th Bedroom: 13X18, 5th Bedroom: 14X16, Alarm system owned, Blinds, Built-in electric oven, Built-in microwave, Carpet, Ceiling fan(s), Gas cooktop, Intercom system, Marble/Stone floors, Water conditioner owned, Water filtering system, Window Coverings Throughout",
        YearBuilt: "2009",
        Type: "0",
        Status: "0",
        Image: "images/gallery/2.jpg",
        Agent: {
            Name: "Olivia Peyton",
            Phone: "(310) 555-2728",
            Picture: "images/employees/09.png"
        }
    },
    {
        ID: "3",
        Favorite: false,
        Address: "328 S Kerema Ave",
        City: "Milford",
        State: "CT",
        ZipCode: "06465",
        Beds: "4",
        Baths: "2",
        HouseSize: 8356,
        LotSize: "0.04",
        Price: 350000,
        Coordinates: "41.1957999,-73.1022988",
        Features: "Dishwasher, Disposal, Refrigerator, Separate laundry room, Washer/Dryer on 2nd floor, Full bath downstairs, Formal dining room, Downstairs family room, Separate family room, Wet bar in family room, Breakfast nook (eating area), Garden window in kitchen, Granite countertops in kitchen, Kitchen island, Marble/Stone flooring in kitchen, Pantry, Formal living room, Front living room, Master bedroom separate from other, Master bedroom upstairs, Sitting room in master bedroom, Walk-in closet in master bedroom, 2nd bedroom: 16x12, 3rd bedroom: 13x16, 4th Bedroom: 18x12, Alarm system owned, Built-in microwave, Carpet, Ceiling fan(s), Double built-in electric ovens, Gas cooktop, Marble/Stone floors",
        YearBuilt: "2010",
        Type: "0",
        Status: "0",
        Image: "images/gallery/3.jpg",
        Agent: {
            Name: "Robert Reagan",
            Phone: "(818) 555-2387",
            Picture: "images/employees/03.png"
        }
    },
    {
        ID: "4",
        Favorite: false,
        Address: "5119 Beryl Dr",
        City: "San Antonio",
        State: "TX",
        ZipCode: "78212",
        Beds: "4",
        Baths: "2",
        HouseSize: 7980,
        LotSize: "0.7",
        Price: 455000,
        Coordinates: "29.4972699,-98.5366788",
        Features: "Dishwasher, Disposal, Refrigerator, Separate laundry room, Full bath downstairs, Living/Dining room combo, Separate family room, Breakfast Bar/Counter, Breakfast nook (eating area), Granite countertops in kitchen, Kitchen custom cabinets, Kitchen island, Recessed lighting in kitchen, Tile flooring in kitchen, Walk-in pantry, Formal living room, Front living room, Ceiling fan in master bedroom, Master bedroom downstairs, Walk-in closet in master bedroom, 2nd bedroom: 15x13, 3rd bedroom: 12x12, 4th Bedroom: 14x12, Alarm system owned, Blinds, Built-in microwave, Carpet, Ceiling fan(s), Central vacuum, Convection oven, Double built-in electric ovens, Electric cooktop, Intercom system, Tile floors",
        YearBuilt: "2007",
        Type: "0",
        Status: "1",
        Image: "images/gallery/4.jpg",
        Agent: {
            Name: "Greta Sims",
            Phone: "(818) 555-6546",
            Picture: "images/employees/04.png"
        }
    },
    {
        ID: "5",
        Favorite: false,
        Address: "61207 16th St N",
        City: "Moorhead",
        State: "MN",
        ZipCode: "56564",
        Beds: "5",
        Baths: "4",
        HouseSize: 14250,
        LotSize: "1.1",
        Price: 1700000,
        Coordinates: "46.88933,-96.7522388",
        Features: "Dishwasher, Disposal, Separate laundry room, Washer/Dryer on 1st floor, Full bath downstairs, Formal dining room, Downstairs family room, Separate family room, Breakfast Bar/Counter, Breakfast nook (eating area), Granite countertops in kitchen, Kitchen custom cabinets, Kitchen island, Formal living room, Rear living room, Sunken living room, Vaulted ceiling in living room, Balcony in master bedroom, Ceiling fan in master bedroom, Master bedroom separate from other, Master bedroom upstairs, Walk-in closet in master bedroom, 2nd bedroom: 16X17, 3rd bedroom: 14X16, 4th Bedroom: 13X13, 5th Bedroom: 12X12, Blinds, Built-in microwave, Carpet, Ceiling fan(s), Central vacuum, Double built-in electric ovens, Gas cooktop, Marble/Stone floors, Pot shelves, Water conditioner owned, Water filtering system, Window Coverings Throughout",
        YearBuilt: "2010",
        Type: "0",
        Status: "0",
        Image: "images/gallery/5.jpg",
        Agent: {
            Name: "John Heart",
            Phone: "(213) 555-9392",
            Picture: "images/employees/01.png"
        }
    },
    {
        ID: "6",
        Favorite: false,
        Address: "8512 Tanglewood Cir",
        City: "Reform",
        State: "AL",
        ZipCode: "35487",
        Beds: "3",
        Baths: "2",
        HouseSize: 5600,
        LotSize: "0.2",
        Price: 250000,
        Coordinates: "33.3794,-87.9785788",
        Features: "Dishwasher, Disposal, Refrigerator, Separate laundry room, Full bath downstairs, Formal dining room, Built-in bookcases in family room, Downstairs family room, Separate family room, Breakfast Bar/Counter, Breakfast nook (eating area), Granite countertops in kitchen, Kitchen custom cabinets, Kitchen island, Marble/Stone flooring in kitchen, Pantry, Formal living room, Front living room, Ceiling fan in master bedroom, Master bedroom downstairs, Master bedroom separate from other, Sitting room in master bedroom, Walk-in closet in master bedroom, 2nd bedroom: 11X15, 3rd bedroom: 11X14, Alarm system owned, Blinds, Built-in microwave, Carpet, Ceiling fan(s), Double built-in electric ovens, Drapes, Electric cooktop, Marble/Stone floors, Window Coverings Throughout, Wine refrigerator",
        YearBuilt: "2011",
        Type: "0",
        Status: "0",
        Image: "images/gallery/6.jpg",
        Agent: {
            Name: "Olivia Peyton",
            Phone: "(310) 555-2728",
            Picture: "images/employees/09.png"
        }
    },
    {
        ID: "7",
        Favorite: false,
        Address: "7121 Bailey St",
        City: "Worcester",
        State: "MA",
        ZipCode: "01605",
        Beds: "4",
        Baths: "3",
        HouseSize: 6900,
        LotSize: "2.1",
        Price: 555000,
        Coordinates: "42.2797,-71.8746388",
        Features: "Dishwasher, Disposal, Refrigerator, Separate laundry room, Washer/Dryer on 1st floor, Full bath downstairs, Formal dining room, Downstairs family room, Separate family room, Breakfast Bar/Counter, Breakfast nook (eating area), Kitchen island, Recessed lighting in kitchen, Tile countertops in kitchen, Walk-in pantry, Entry foyer, Formal living room, Front living room, Dressing room in master bedroom, Master bedroom separate from other, Master bedroom upstairs, Walk-in closet in master bedroom, 2nd bedroom: 14x16, 3rd bedroom: 12x13, 4th Bedroom: 13x14, Carpet, Double built-in electric ovens, Drywall, Gas cooktop, Manmade wood or laminate floors, Marble/Stone floors, Water conditioner loope",
        YearBuilt: "2008",
        Type: "0",
        Status: "1",
        Image: "images/gallery/7.jpg",
        Agent: {
            Name: "Robert Reagan",
            Phone: "(818) 555-2387",
            Picture: "images/employees/03.png"
        }
    },
    {
        ID: "8",
        Favorite: false,
        Address: "620201 Plymouth Rd",
        City: "Detroit",
        State: "MI",
        ZipCode: " 48224",
        Beds: "4",
        Baths: "4",
        HouseSize: 7840,
        LotSize: "0.33",
        Price: 610000,
        Coordinates: "42.3716299,-83.2572188",
        Features: "Dishwasher, Disposal, Refrigerator, Separate laundry room, Full bath downstairs, Formal dining room, 2+ family rooms, Separate family room, Breakfast nook (eating area), Granite countertops in kitchen, Kitchen custom cabinets, Kitchen island, Walk-in pantry, Entry foyer, Formal living room, Rear living room, Vaulted ceiling in living room, Ceiling fan in master bedroom, Master bedroom downstairs, Walk-in closet in master bedroom, 2nd bedroom: 12x15, 3rd bedroom: 12x15, 4th Bedroom: 12x15, Blinds, Built-in microwave, Carpet, Ceiling fan(s), Electric cooktop, Shutters, Skylight(s), Water conditioner owned, Water filtering system, Window coverings partial",
        YearBuilt: "2010",
        Type: "0",
        Status: "0",
        Image: "images/gallery/8.jpg",
        Agent: {
            Name: "Greta Sims",
            Phone: "(818) 555-6546",
            Picture: "images/employees/04.png"
        }
    },
    {
        ID: "9",
        Favorite: false,
        Address: "1198 Theresa Cir",
        City: "Whitinsville",
        State: "MA",
        ZipCode: "01582",
        Beds: "4",
        Baths: "3",
        HouseSize: 4990,
        LotSize: "0.8",
        Price: 320000,
        Coordinates: "42.1072,-71.6928888",
        Features: "Dishwasher, Disposal, Refrigerator, Separate laundry room, Washer/Dryer on 1st floor, 1/2 bath downstairs, Formal dining room, 2+ family rooms, Built-in bookcases in family room, Breakfast Bar/Counter, Granite countertops in kitchen, Kitchen island, Tile flooring in kitchen, Walk-in pantry, Entry foyer, Formal living room, Built-in bookcases in master bedroom, Built-in entertainment center in master bedroom, Ceiling fan in master bedroom, Dressing room in master bedroom, Walk-in closet in master bedroom, 2nd bedroom: 13x12, 3rd bedroom: 12x12, 4th Bedroom: 13x12, Alarm system rented, Blinds, Built-in microwave, Carpet, Ceiling fan(s), Double built-in gas ovens, Tile floors, Window Coverings Throughout",
        YearBuilt: "2011",
        Type: "0",
        Status: "0",
        Image: "images/gallery/9.jpg",
        Agent: {
            Name: "John Heart",
            Phone: "(213) 555-9392",
            Picture: "images/employees/01.png"
        }
    }
];

</script>

<style>
.large-text {
    font-size: 24px;
    color: #ff6a50;
}

.opacity {
    opacity: 0.5;
}

.images {
    font-size: 0;
}

.images > div {
    display: inline-block;
    width: 33.3%;
    vertical-align: top;
}

.images .item-content {
    position: relative;
    margin: 5px;
    color: #fff;
    cursor: pointer;
}

.images .item-content > img {
    width: 100%;
}

.item-content .item-options {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}

.images .item-content:hover > .item-options {
    box-shadow: inset 0 0 0 2px #f05b41;
}

.item-content .item-options > div {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 64px;
    padding-top: 4px;
    background-color: rgba(19,32,51,0.8);
    z-index: 1;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-left: 2px solid transparent;
    border-right: 2px solid transparent;
}

.images .item-content:hover > .item-options > div {
    border-bottom: 2px solid #f05b41;
    border-left: 2px solid #f05b41;
    border-right: 2px solid #f05b41;
}

.item-content .item-options .address,
.item-content .item-options .price {
    max-width: 70%;
    padding-left: 8px;
}

.item-content .item-options .address {
    font-size: 14px;
}

.item-content .item-options .agent {
    font-size: 12px;
    width: 60px;
    position: absolute;
    right: -2px;
    top: 0;
    bottom: 0;
    text-align: center;
    border-left: 1px solid rgba(255, 255, 255, 0.4);
    line-height: 13px;
}

.item-content .item-options .agent > div:hover {
    color: #f05b41;
}

.item-content .item-options .agent img {
    display: block;
    width: 13px;
    height: 16px;
    margin: 8px auto 2px;
}

.agent-details > img, .agent-details > div {
    display: inline-block;
    vertical-align: top;
    line-height: 26px;
}

.agent-details > img {
    width: 40px;
    margin-right: 10px;
}

.agent-details .phone {
    font-size: 18px;
}

.popup-property-details {
    overflow: hidden;
    position: relative;
}

.popup-property-details .images {
    width: 700px;
}

.popup-property-details img {
    height: 205px;
    margin: 10px 10px 10px 0;
}

.dx-button.favorites {
    background-color: #f05b41;
    color: #fff;
    position: absolute;
    top: 5px;
    right: 0;
}

.dx-button.favorites .dx-icon {
    color: #fff;
}
</style>
