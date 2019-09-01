<template>
    <!-- 5 rates -->
    <div class="card-rate">

        <div :class="val1" @click="rateThis(1, 'yes')">
            <span class="cr-sek-line left"></span>
            <div class="cr-icn">
                <span class="cr-ttl">1</span>
            </div>
            <div class="txt-site txt-10 txt-primary txt-bold">
                {{ ttl1 }}
            </div>
        </div>
        <div :class="val2" @click="rateThis(2, 'yes')">
            <span class="cr-sek-line"></span>
            <div class="cr-icn">
                <span class="cr-ttl">2</span>
            </div>
            <div class="txt-site txt-10 txt-primary txt-bold">
                {{ ttl2 }}
            </div>
        </div>
        <div :class="val3" @click="rateThis(3, 'yes')">
            <span class="cr-sek-line"></span>
            <div class="cr-icn">
                <span class="cr-ttl">3</span>
            </div>
            <div class="txt-site txt-10 txt-primary txt-bold">
                {{ ttl3 }}
            </div>
        </div>
        <div :class="val4" @click="rateThis(4, 'yes')">
            <span class="cr-sek-line"></span>
            <div class="cr-icn">
                <span class="cr-ttl">4</span>
            </div>
            <div class="txt-site txt-10 txt-primary txt-bold">
                {{ ttl4 }}
            </div>
        </div>
        <div :class="val5" @click="rateThis(5, 'yes')">
            <span class="cr-sek-line right"></span>
            <div class="cr-icn">
                <span class="cr-ttl">5</span>
            </div>
            <div class="txt-site txt-10 txt-primary txt-bold">
                {{ ttl5 }}
            </div>
        </div>

    </div>
</template>
<script>
export default {
    props: ['idbookmark', 'ttl', 'rates'],
    data () {
        return {
            urlPostRate: this.baseUrl+'/api/rates/publish?token='+this.$cookie.get('jwt'),
            val1: 'cr-frame cr-emp',
            val2: 'cr-frame cr-emp',
            val3: 'cr-frame cr-emp',
            val4: 'cr-frame cr-emp',
            val5: 'cr-frame cr-emp',
            ttl1: '0',
            ttl2: '0',
            ttl3: '0',
            ttl4: '0',
            ttl5: '0',
        }
    },
    created: function () {
        // console.log(this.ttl);
        
        this.rateThis(this.ttl, 'no')
        
        
        if (this.rates != '') 
        {
            this.ttl1 = this.rates[0].ttl_rate1
            this.ttl2 = this.rates[0].ttl_rate2
            this.ttl3 = this.rates[0].ttl_rate3
            this.ttl4 = this.rates[0].ttl_rate4
            this.ttl5 = this.rates[0].ttl_rate5   
        }
    },
    methods: {
        rateThis: function (val, check) {
            
            if (check != 'no') 
            {
                axios.post(this.urlPostRate, {
                    'rate': val,
                    'idbookmark': this.idbookmark
                })
                .then(response => {
                    if (response.data.status == 'success') 
                    {
                        this.$openMessageBottom('open', response.data.message);
                    } 
                    else 
                    {
                        this.$openMessageBottom('open', response.data.message);
                    }
                    // console.log(response.data);

                    this.ttl1 = response.data.rate[0].ttl_rate1
                    this.ttl2 = response.data.rate[0].ttl_rate2
                    this.ttl3 = response.data.rate[0].ttl_rate3
                    this.ttl4 = response.data.rate[0].ttl_rate4
                    this.ttl5 = response.data.rate[0].ttl_rate5
                    
                })
                .catch(e => {
                    console.log(e.response);
                    this.$openMessageBottom('open', e.response.jsonText);
                    
                })
            }


            if (val) 
            {
                if (val == '1') 
                {
                    this.val1 = 'cr-frame cr-val'
                    this.val2 = 'cr-frame cr-emp'
                    this.val3 = 'cr-frame cr-emp'
                    this.val4 = 'cr-frame cr-emp'
                    this.val5 = 'cr-frame cr-emp'
                }
                if (val == '2') 
                {
                    this.val1 = 'cr-frame cr-val'
                    this.val2 = 'cr-frame cr-val'
                    this.val3 = 'cr-frame cr-emp'
                    this.val4 = 'cr-frame cr-emp'
                    this.val5 = 'cr-frame cr-emp'
                }
                if (val == '3') 
                {
                    this.val1 = 'cr-frame cr-val'
                    this.val2 = 'cr-frame cr-val'
                    this.val3 = 'cr-frame cr-val'
                    this.val4 = 'cr-frame cr-emp'
                    this.val5 = 'cr-frame cr-emp'
                }
                if (val == '4') 
                {
                    this.val1 = 'cr-frame cr-val'
                    this.val2 = 'cr-frame cr-val'
                    this.val3 = 'cr-frame cr-val'
                    this.val4 = 'cr-frame cr-val'
                    this.val5 = 'cr-frame cr-emp'
                }
                if (val == '5') 
                {
                    this.val1 = 'cr-frame cr-val'
                    this.val2 = 'cr-frame cr-val'
                    this.val3 = 'cr-frame cr-val'
                    this.val4 = 'cr-frame cr-val'
                    this.val5 = 'cr-frame cr-val'
                }
            }


        }
    }
}
</script>

