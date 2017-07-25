<ScrollView> //Page Level Root
  <View>//This start upper third flex 1
    <View> //this is the counter flex 1
      <Text>{this.state.newamount}</Text>
    </View>//this ends counter
    <View>//This is dropper and counter flex 2 and flex row
      <View>//this is the water drop flex 2
        <Text>{this.props.navigation.state.params.userId}</Text>
      </View>//this ends water drop
      <View>//this is the +/- flex 1 flex
        <Button onPress = {this.onSubmit}
        title="button"
        color="#841584"
        />
      </View>//this ends +/-
    </View>//this ends drop and counter
  </View>//this ends upper third flex 1
  <View>//this starts middle third flex 1
    <Button
    onPress= { () => {this.props.navigation.navigate('Home')}}
    title="Logout"
    color="#841584"/>
  </View>//this ends middle third
  <View>//this starts bottom third flex 1
  </View>//this ends bottom third
</ScrollView>
