let obj =
{
    "name": "test",
    "email": "",
    "password": "test"
}

let login_obj =
{
    "email": "test",
    "password": "test"
}

test('Checking the register Component', () => {
    const { name, email, password } = obj;
    expect(name).toBe('test');
    expect(email).toBe('');
    expect(password).toBe('test');
});
test('Checking the Login Component', () => {
    const { email, password } = login_obj;
    expect(email).toBe('test');
    expect(password).toBe('test');

});
